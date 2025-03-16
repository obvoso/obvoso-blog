"use server"

import { NotionData } from "@/types/notion"
import { S3, S3Client } from "@aws-sdk/client-s3"
import { getPlaiceholder } from "plaiceholder"
import { cache } from "react"

import {
  NotionBlock,
  NotionBlockChildList,
  NotionImageBlock,
} from "@/types/image"
import { notion } from "../utils/notionClient"

const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID!
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!
const bucket = process.env.AWS_BUCKET!
const endpoint = process.env.AWS_IMAGE_ENDPOINT!

const client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
})

const s3 = new S3(client)

/* 버킷에 이미지 존재 여부 확인 함수 */
const checkIsExist = (url: string, id: string) =>
  url.includes(`/image/thumbnail/${id}`)

/* 이미지 블러 처리 함수 */
export const getBlurImage = async (imageUrl: string) => {
  const startTime = performance.now()
  console.log(`⏳ getBlurImage 시작: ${startTime.toFixed(2)}ms`)

  console.time("❗️getBlurImage")

  console.time("fetch-image")
  const response = await fetch(imageUrl)
  console.timeEnd("fetch-image")

  console.time("convert-to-buffer")
  const arrayBuffer = await response.arrayBuffer()
  const body = Buffer.from(arrayBuffer)
  console.timeEnd("convert-to-buffer")

  console.time("generate-blur")
  const { base64: blurDataURL } = await getPlaiceholder(body, { size: 10 })
  console.timeEnd("generate-blur")

  console.timeEnd("❗️getBlurImage")

  const endTime = performance.now()
  console.log(`✅ getBlurImage 완료: ${(endTime - startTime).toFixed(2)}ms`)

  return blurDataURL
}

/* 버킷에 이미지 업로드 함수 */
const upload = async (imageUrl: string, keyBase: string) => {
  const response = await fetch(imageUrl)
  const arrayBuffer = await response.arrayBuffer()
  const body = Buffer.from(arrayBuffer)

  const contentType =
    response.headers.get("Content-Type") || "application/octet-stream"

  let extension = ""
  if (contentType === "image/jpeg") {
    extension = ".jpg"
  } else if (contentType === "image/png") {
    extension = ".png"
  } else if (contentType === "image/gif") {
    extension = ".gif"
  } else if (contentType === "image/webp") {
    extension = ".webp"
  }

  const key = `${keyBase}${extension}`

  // 이미지 업로드
  await s3.putObject({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    ContentDisposition: "inline", // 브라우저에서 다운로드가 아닌 렌더링되도록 설정
  })

  const convertUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`
  return convertUrl
}

export const getBlocks = async (blockId: string): Promise<NotionBlock[]> => {
  let cursor: string | null = null
  let hasMore = true
  const blocks: NotionBlock[] = []
  console.time("getBlocks")
  while (hasMore) {
    /* eslint-disable no-await-in-loop, @typescript-eslint/naming-convention */
    const { has_more, next_cursor, results }: NotionBlockChildList =
      await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor ?? undefined,
      })
    blocks.push(...results)
    hasMore = has_more
    cursor = next_cursor
  }

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => "has_children" in block && block.has_children)
      .map(async (block) => {
        const childBlock = await getBlocks(block.id)
        return childBlock
      }),
  )
  console.timeEnd("getBlocks")
  return [...blocks, ...childBlocks.flat()]
}

export async function getAllNotionImageBlocks(
  blockId: string,
): Promise<NotionImageBlock[]> {
  const allNotionBlocks = await getBlocks(blockId)
  console.time("getAllNotionImageBlocks")

  const imageBlocks = allNotionBlocks.filter(
    (block) => "type" in block && block.type === "image",
  )

  const ret = imageBlocks.map((block) => ({
    id: block.id,
    image: block.image,
  }))
  console.timeEnd("getAllNotionImageBlocks")
  return ret
}

export const convertThumbnail = async (notionData: NotionData) => {
  console.time("convertThumbnail")
  let convertImageUrl = notionData.thumbnail
  const isExist = checkIsExist(notionData.thumbnail, notionData.id)
  if (!isExist) {
    const imageUrl = notionData.thumbnail
    try {
      const key = `${endpoint}/thumbnail/${notionData.id}`
      convertImageUrl = await upload(imageUrl, key)

      await notion.pages.update({
        page_id: notionData.id,
        properties: {
          thumbnail: {
            files: [
              {
                external: {
                  url: convertImageUrl,
                },
                name: notionData.id,
              },
            ],
          },
        },
      })
    } catch (e) {
      throw new Error(`Failed to fetch image from Notion: ${e}`)
    }
  }
  console.timeEnd("convertThumbnail")
  return {
    thumbnail: convertImageUrl,
    blurThumbnail: await getBlurImage(convertImageUrl),
  }
}

/**
 * @param id 노션 페이지의 id
 * 노션의 이미지 블록(링크)을 s3의 이미지로 변환하는 함수
 * 이미지 블록의 url을 변환하여 Notion에 업데이트
 */
export const convertNotionImageBlocks = async (id: string) => {
  const imageBlocks = await getAllNotionImageBlocks(id)

  console.time("convertImageBlocks")
  await Promise.all(
    Array.from(imageBlocks).map(async (block, idx) => {
      const { id: blockId, image } = block

      if (image.type === "file") {
        const key = `${endpoint}/block/${id}--${idx}`
        const imageUrl = image.file.url
        try {
          const convertUrl = await upload(imageUrl, key)
          await notion.blocks.update({
            block_id: blockId,
            image: {
              external: {
                url: convertUrl,
              },
            },
          })
        } catch (e) {
          throw new Error(`Failed to fetch image from Notion: ${e}`)
        }
      }
    }),
  )
  console.timeEnd("convertImageBlocks")
}

/**
 * 썸네일 이미지 변환 함수
 * 변환된 url을 thumbnail에 할당하여 반환
 */
export const convertThumbnailImage = cache(
  async (stream: NotionData[]): Promise<NotionData[]> => {
    console.time("convertNotionImage")
    const ret = await Promise.all(
      stream.map(async (data) => {
        const { thumbnail, blurThumbnail } = await convertThumbnail(data)
        return {
          ...data,
          thumbnail,
          blurThumbnail,
        }
      }),
    )
    console.timeEnd("convertNotionImage")
    return ret
  },
)
