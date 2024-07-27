import { generateSlug } from "./utils"

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

/**
 *
 * @param id
 * @returns string
 */
export const getNotionArticleData = async (id: string) => {
  const mdblocks = await n2m.pageToMarkdown(id)
  const mdString = n2m.toMarkdownString(mdblocks)
  return mdString.parent
}

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

  return data.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.title.title[0].plain_text,
      slug: generateSlug(page.properties.title.title[0].plain_text),
      category: page.properties.category.select.name,
    }
  })
}
