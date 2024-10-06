import { NotionImageBlock } from "@/types/image"
import { getBlocks } from "../api/notion"

export async function getAllNotionImageBlocks(
  blockId: string,
): Promise<NotionImageBlock[]> {
  const allNotionBlocks = await getBlocks(blockId)

  const imageBlocks = allNotionBlocks.filter(
    (block) => "type" in block && block.type === "image",
  )
  const ret = imageBlocks.map((block) => {
    return {
      id: block.id,
      image: block.image,
    }
  })
  return ret
}
