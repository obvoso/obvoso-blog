import { NotionData } from "@/types/notion"
import { GetObjectCommand, S3, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { getPlaiceholder } from "plaiceholder"

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
const checkIsExist = async (key: string) => {
  try {
    await s3.headObject({ Bucket: bucket, Key: key })
    return true
  } catch (e) {
    return false
  }
}

/* 이미지 블러 처리 함수 */
const getBlurImage = async (body: Buffer) => {
  const { base64 } = await getPlaiceholder(body, { size: 10 })
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "")
  const buffer = Buffer.from(base64Data, "base64")
  return buffer
}

/* 버킷에 이미지 업로드 함수 */
const upload = async (key: string, body: Buffer) => {
  await s3.putObject({
    Bucket: bucket,
    Key: key,
    Body: body,
  })
  await s3.putObject({
    Bucket: bucket,
    Key: `${key}?blur`,
    Body: await getBlurImage(body),
  })
}

/* 버킷에서 이미지 다운로드 함수 */
const download = async (key: string) => {
  const urlCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  })
  const blurUrlCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: `${key}?blur`,
  })

  const [url, blurBuffer] = await Promise.all([
    getSignedUrl(s3, urlCommand, { expiresIn: 60 * 60 * 24 }),
    s3.send(blurUrlCommand).then((data) => data.Body?.transformToByteArray()),
  ])

  const blurBase64 = blurBuffer
    ? `data:image/svg+xml;base64,${Buffer.from(blurBuffer).toString("base64")}`
    : null

  return [url, blurBase64]
}

/**
 * 이미지 변환의 전체 흐름을 담당하는 함수
 * 변환된 url을 thumbnail에 할당하여 반환
 */
export const convertThumbnailImage = async (stream: NotionData[]) => {
  const datas = await Promise.all(
    stream.map(async (data) => {
      const key = `${endpoint}/thumbnail/${data.id}`
      const isExist = await checkIsExist(key)
      if (!isExist) {
        const imageUrl = data.thumbnail!
        try {
          const response = await fetch(imageUrl)
          const arrayBuffer = await response.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          await upload(key, buffer)
        } catch (e) {
          throw new Error(`Failed to fetch image from Notion: ${e}`)
        }
      }
      const [url, blurBase64] = await download(key)
      return { ...data, thumbnail: url, blurThumbnail: blurBase64 }
    }),
  )
  return datas
}
