"use client"

import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { NotionData } from "@/types/notion"
import { Box, Grid } from "@mui/material"
import Link from "next/link"
import ArticleThumbnail from "./ArticleThumbnail"

type FilterArticleProps = {
  initialArticles: NotionData[]
}

export default function InfiniteScrollArticles({
  initialArticles,
}: FilterArticleProps) {
  const { articleList, ref } = useInfiniteScroll({ initialArticles })

  return (
    <Box sx={{ flexDirection: "row", width: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{
          padding: 4,
        }}
      >
        {articleList.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Link href={`/articles/${post.slug}`}>
              <ArticleThumbnail article={post} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box
        ref={ref}
        sx={{
          height: "20px",
        }}
      />
    </Box>
  )
}
