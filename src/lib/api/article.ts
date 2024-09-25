import { NotionData } from "@/types/notion"
import { getAllPost, getNotionArticleData } from "./notion"

export async function getArticleData(slug: string) {
  const decodeSlug = decodeURIComponent(slug)
  const data = await getAllPost()
  const page = data.find(
    (item: NotionData) => item.slug === decodeSlug || item.slug === slug,
  )

  if (!page) {
    throw new Error("Notion data not found")
  }
  const post = await getNotionArticleData(String(page.id))
  if (!post) {
    throw new Error("Notion data not found")
  }
  return post
}

export async function getArticleHeader(slug: string) {
  const decodeSlug = decodeURIComponent(slug)
  const data = await getAllPost()
  const page = data.find(
    (item: NotionData) => item.slug === decodeSlug || item.slug === slug,
  )

  if (!page) {
    throw new Error("Notion data not found")
  }
  return {
    title: page.title,
    description: page.description,
    createdTime: page.createdTime,
    category: page.category,
    tag: page.tag,
    thumbnail: page.thumbnail,
    blurThumbnail: page.blurThumbnail,
  }
}

export async function getHotArticle() {
  const res = await getAllPost()
  const data = res.filter((item: NotionData) => item.hotAtcicle)
  return data
}
