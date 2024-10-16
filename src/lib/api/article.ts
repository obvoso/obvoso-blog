import { Heading } from "@/types/heading"
import { NotionData } from "@/types/notion"
import { cache } from "react"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { rehypeExtractHeadings } from "../utils/heading"
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

const getMataDataByIndex = async (index: number | null) => {
  const data = await getAllPost()
  return index ? data[data.length - index] : null
}

async function getArticleHeadingsAndSection(post: string) {
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
  const post = await getNotionArticleData(String(page.id))

  if (!post) {
    throw new Error("Notion data not found")
  }

  const { headings } = await getArticleHeadingsAndSection(post)

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
