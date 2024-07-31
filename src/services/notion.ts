import { generateSlug } from "./utils"

const { Client } = require("@notionhq/client")
const { NotionToMarkdown } = require("notion-to-md")

const token = process.env.NEXT_PUBLIC_NOTION_TOKEN
const dbID = process.env.NEXT_PUBLIC_NOTION_DB_ID

const notion = new Client({
  auth: token,
})

const n2m = new NotionToMarkdown({
  notionClient: notion,
})

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
export const getAllPost = async () => {
  const data = await notion.databases.query({
    database_id: dbID,
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

  return data.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.title.title[0].plain_text,
      slug: generateSlug(page.properties.title.title[0].plain_text),
      category: page.properties.category.select.name,
      tag: page.properties.tags.multi_select.map((tag: any) => tag.name),
    }
  })
}
