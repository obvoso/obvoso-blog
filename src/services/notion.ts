const { Client } = require("@notionhq/client")

const token = process.env.NOTION_TOKEN
const dbID = process.env.NOTION_DB_ID

const notion = new Client({
  auth: token,
})

const getAll = async () => {
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

  console.log(data)
}

export default getAll
