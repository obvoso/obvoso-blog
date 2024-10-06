import { NotionData } from "@/types/notion"
import { S3, S3Client } from "@aws-sdk/client-s3"
import { getPlaiceholder } from "plaiceholder"
import { cache } from "react"
import { getAllNotionImageBlocks } from "../utils/images"
import { notion } from "./notion"

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
const checkIsExist = (url: string, id: string) => {
  return url.includes(`/image/thumbnail/${id}`)
}

/* 이미지 블러 처리 함수 */
const getBlurImage = async (imageUrl: string) => {
  const response = await fetch(imageUrl)
  const arrayBuffer = await response.arrayBuffer()
  const body = Buffer.from(arrayBuffer)

  // const { base64 } = await getPlaiceholder(body, { size: 10 })
  const { base64: blurDataURL } = await getPlaiceholder(body, { size: 10 })
  return blurDataURL
  // const base64Data = base64.replace(/^data:image\/\w+;base64,/, "")
  // const buffer = Buffer.from(base64Data, "base64")
  // return buffer
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

/* 버킷에서 이미지 다운로드 함수 */
// const download = async (key: string) => {
//   const urlCommand = new GetObjectCommand({
//     Bucket: bucket,
//     Key: key,
//   })
//   const blurUrlCommand = new GetObjectCommand({
//     Bucket: bucket,
//     Key: `${key}?blur`,
//   })

//   const [url, blurBuffer] = await Promise.all([
//     getSignedUrl(s3, urlCommand, { expiresIn: 60 * 60 * 24 }),
//     s3.send(blurUrlCommand).then((data) => data.Body?.transformToByteArray()),
//   ])

//   const blurBase64 = blurBuffer
//     ? `data:image/svg+xml;base64,${Buffer.from(blurBuffer).toString("base64")}`
//     : null

//   return [url, blurBase64]
// }

export const convertThumbnail = async (notionData: NotionData) => {
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
  return {
    thumbnail: convertImageUrl,
    blurThumbnail: await getBlurImage(convertImageUrl),
  }
}

/**
 * @param id 노션 페이지의 id
 * 이미지 블록을 변환하는 함수
 * 이미지 블록의 url을 변환하여 Notion에 업데이트
 */
export const convertImageBlocks = async (id: string) => {
  const imageBlocks = await getAllNotionImageBlocks(id)

  for (const [idx, block] of imageBlocks.entries()) {
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
  }
}

/**
 * 이미지 변환의 전체 흐름을 담당하는 함수
 * 변환된 url을 thumbnail에 할당하여 반환
 */
export const convertNotionImage = cache(
  async (stream: NotionData[]): Promise<NotionData[]> => {
    const ret = await Promise.all(
      stream.map(async (data) => {
        await convertImageBlocks(data.id)
        const { thumbnail, blurThumbnail } = await convertThumbnail(data)
        return {
          ...data,
          thumbnail,
          blurThumbnail,
        }
      }),
    )

    return ret
  },
)
