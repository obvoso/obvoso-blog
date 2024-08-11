import { getAllPost } from "@/services/notion"
import { NotionData } from "@/types/notion"
import { Grid } from "@mui/material"
import Link from "next/link"
import ArticleThumbnail from "./ArticleThumbnail"

export default async function ArticlesList() {
  const data: NotionData[] = await getAllPost()

  return (
    <Grid container spacing={2}>
      {data.map((post) => (
        <Grid item xs={12} md={6} key={post.id}>
          <Link href={`/articles/${post.slug}`}>
            <ArticleThumbnail article={post} />
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}
