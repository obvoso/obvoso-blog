const { Client } = require("@notionhq/client")

const token = process.env.NOTION_TOKEN

export const notion = new Client({
  auth: token,
})
