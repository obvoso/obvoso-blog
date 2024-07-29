import { NotionData } from "@/types/notion"
import { getAll, getNotionArticleData } from "./notion"

export async function getArticleData(slug: string) {
  const data = await getAll()
  const post = await getNotionArticleData(
    data.find((page: NotionData) => page.slug === slug).id,
  )

  return post
}
