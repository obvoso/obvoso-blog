import { NotionData } from "@/types/notion"
import { getAllPost, getNotionArticleData } from "./notion"

export async function getArticleData(slug: string) {
  const data = await getAllPost()
  const post = await getNotionArticleData(
    data.find((page: NotionData) => page.slug === slug).id,
  )

  return post
}
