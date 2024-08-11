import { NotionData } from "@/types/notion"
import { getAllPost, getNotionArticleData } from "./notion"

export async function getArticleData(slug: string) {
  const data = await getAllPost()
  const page = data.find((page: NotionData) => page.slug === slug)
  if (!page) {
    throw new Error("Notion data not found")
  }
  const post = await getNotionArticleData(String(page.id))
  if (!post) {
    throw new Error("Notion data not found")
  }
  return post
}
