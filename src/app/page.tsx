import { getAll } from "@/services/notion"
import { Box } from "@mui/material"

export default async function Home() {
  const data = await getAll()
  console.log(data)

  return (
    <Box component="main" sx={{ p: 2, border: "1px dashed grey" }}>
      <ul>
        {data.map((page: any) => {
          return (
            <li key={page.id}>
              <a href={`/articles/${page.slug}`}>{page.title}</a>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}
