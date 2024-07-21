const { Client } = require("@notionhq/client")

const token = process.env.NOTION_TOKEN
const dbID = process.env.NOTION_DB_ID

const notion = new Client({
  auth: token,
})
/**
 * todo: 받아온 id를 이용해서 notion에 있는 데이터를 get하는 함수
 */
const getPost = async (id: string) => {}
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
