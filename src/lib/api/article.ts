import { Heading } from "@/types/heading"
import { NotionData } from "@/types/notion"
import { cache } from "react"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { extractHeadings } from "../utils/heading"
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

async function getArticleHeadings(post: string): Promise<Heading[]> {
  const result = await unified()
    .use(remarkParse) // md 파싱
    .use(remarkRehype) // html로 변환
    .use(rehypeSlug) // 헤딩에 id 추가
    .use(extractHeadings) // 헤딩 정보 추출
    .use(rehypeStringify) // html 문자열로 변환
    .process(post)

  return (result.data as any).headings
}

export async function getArticleData(slug: string) {
  const page = await getSlugPage(slug)
  const post = await getNotionArticleData(String(page.id))

  if (!post) {
    throw new Error("Notion data not found")
  }

  const headings = await getArticleHeadings(post)

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
