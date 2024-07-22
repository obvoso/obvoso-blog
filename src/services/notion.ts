const { Client } = require("@notionhq/client")
const { NotionToMarkdown } = require("notion-to-md")

const token = process.env.NOTION_TOKEN
const dbID = process.env.NOTION_DB_ID

const notion = new Client({
  auth: token,
})

/**
 * todo: notion에서 받아온 데이터를 markdown으로 변환하는 함수
 * @param id
 * @returns list of markdown blocks
 */
const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: {
    // separateChildPage: true, // default: false
  },
})

export const getNotionData = async (id: string) => {
  const mdblocks = await n2m.pageToMarkdown(id)
  const mdString = n2m.toMarkdownString(mdblocks)
  return mdString.parent
}

/**
 * todo: 받아온 id를 이용해서 notion에 있는 데이터를 get하는 함수
 */
export const getPost = async (id: string) => {
  const data = await notion.pages.retrieve({ page_id: id })
  return data
}

export const getAll = async () => {
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
  return data
}
