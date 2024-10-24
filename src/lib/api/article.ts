import { Heading } from "@/types/heading"
import { NotionData } from "@/types/notion"
import { cache } from "react"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { rehypeExtractHeadings } from "../utils/toc"
import { getAllPost, getNotionArticlePage } from "./notion"

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

async function getMetaDataByIndex(index: number | null) {
  const data = await getAllPost()
  if (index) {
    const page = data.find((item: NotionData) => item.index === index)
    return page
  }
  return null
}

async function getArticleHeadings(post: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeExtractHeadings)
    .use(rehypeStringify)
    .process(post)

  return {
    headings: result.data.headings as Heading[],
  }
}

export async function getArticleData(slug: string) {
  const page = await getSlugPage(slug)
  const getCachedPost = getNotionArticlePage(String(page.id))
  const post = await getCachedPost()

  if (!post) {
    throw new Error("Notion data not found")
  }

  const { headings } = await getArticleHeadings(post)

  return { post, headings }
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
  const prevMataData = await getMetaDataByIndex(page.prevIndex)
  const nextMataData = await getMetaDataByIndex(page.nextIndex)

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
