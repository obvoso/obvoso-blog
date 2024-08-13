import { cache } from "react"
import { convertThumbnailImage } from "./images"
import { generateSlug, parseDate } from "./utils"

const { Client } = require("@notionhq/client")
const { NotionToMarkdown } = require("notion-to-md")

const token = process.env.NOTION_TOKEN
const dbID = process.env.NOTION_DB_ID

const notion = new Client({
  auth: token,
})

const n2m = new NotionToMarkdown({
  notionClient: notion,
})

let cursor: undefined | null | string = undefined

/**
 * 노션 데이터베이스에서 모든 태그와 카테고리를 가져옵니다.
 */
export const getAllTagsWithCategory = async () => {
  const res = await notion.databases.retrieve({ database_id: dbID })
  const data = res.properties.category.select.options.map((category: any) => {
    return {
      name: category.name,
      tags: res.properties.tags.multi_select.options
        .filter((tag: any) => tag.color === category.color)
        .map((tag: any) => tag.name),
    }
  })
  data.unshift({
    name: "전체보기",
    tags: [],
  })
  return data
}

/**
 * 노션 페이지의 데이터를 마크다운 형식으로 변환합니다.
 */
export const getNotionArticleData = async (id: string) => {
  const mdblocks = await n2m.pageToMarkdown(id)
  const mdString = n2m.toMarkdownString(mdblocks)
  return mdString.parent
}

/**
 * 노션 데이터베이스에서 모든 게시글을 가져옵니다.
 */
export const getAllPost = cache(async () => {
  const res = await notion.databases.query({
    database_id: dbID,
    start_cursor: cursor,
    filter: {
      property: "isRelease",
      checkbox: {
        equals: true,
      },
    },
    sort: {
      property: "createdTime",
      direction: "descending",
    },
  })

  /**
   * cursor가 null이면 데이터가 더 이상 없다는 뜻이므로 빈 배열을 반환합니다.
   * 나중에 게시글이 100개 이상이 되면 페이지네이션을 구현해야 함
   * https://developers.notion.com/reference/intro#pagination
   *   if (data.has_more === true) cursor = data.next_cursor
   */
  const data = res.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.title.title[0].plain_text,
      description: page.properties.description.rich_text[0].plain_text,
      createdTime: parseDate(page.created_time),
      slug: generateSlug(page.properties.title.title[0].plain_text),
      category: page.properties.category.select.name,
      tag: page.properties.tags.multi_select.map((tag: any) => tag.name),
      thumbnail: page.properties.thumbnail.files[0].file.url,
      blurThumbnail: "",
    }
  })
  return convertThumbnailImage(data)
})
