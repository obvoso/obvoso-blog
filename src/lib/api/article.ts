import { NotionData } from "@/types/notion"
import { cache } from "react"
import { getAllPost, getNotionArticleData } from "./notion"

export const getSlugPage = cache(async (slug: string) => {
  const decodeSlug = decodeURIComponent(slug)
  const data = await getAllPost()
  const page = data.find(
    (item: NotionData) => item.slug === decodeSlug || item.slug === slug,
  )

  if (!page) {
    throw new Error("Notion data not found")
  }
  return page
})

const getMataDataByIndex = async (id: number | null) => {
  const data = await getAllPost()
  return id ? data[id - 1] : null
}

export async function getArticleData(slug: string) {
  const page = await getSlugPage(slug)
  const post = await getNotionArticleData(String(page.id))
  if (!post) {
    throw new Error("Notion data not found")
  }
  return post
}

export async function getArticleHeader(slug: string) {
  const page = await getSlugPage(slug)

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

export async function getArticleFooterNavigation(slug: string) {
  const page = await getSlugPage(slug)
  const prevMataData = await getMataDataByIndex(page.prevIndex)
  const nextMataData = await getMataDataByIndex(page.nextIndex)
  return {
    prev: prevMataData,
    next: nextMataData,
  }
}

export async function getHotArticle() {
  const res = await getAllPost()
  const data = res.filter((item: NotionData) => item.hotAtcicle)
  return data
}
