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
})

export const getNotionData = async (id: string) => {
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
      category: page.properties.category.select.name,
      slug:
        page.properties.title.title[0].plain_text ||
        generateSlug(page.properties.Name.title[0].text.content),
    }
  })
}

function generateSlug(title: string) {
  return encodeURIComponent(title.toLowerCase().replace(/ /g, "-"))
}
