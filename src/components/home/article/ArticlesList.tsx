import { getAllPost } from "@/services/notion"
import { NotionData } from "@/types/notion"
import { Grid } from "@mui/material"
import FilterArticle from "./FilterArticle"

export default async function ArticlesList() {
  const data: NotionData[] = await getAllPost()

  return (
    <Grid container spacing={2}>
      <FilterArticle articles={data} />
    </Grid>
  )
}
