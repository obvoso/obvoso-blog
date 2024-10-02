"use client"

import CustomBox from "@/app/components/common/CustomBox"
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
    <CustomBox
      sx={{
        backgroundColor: "var(--background-opacity)",
        borderRadius: "0px 0px 32px 32px",
        paddingX: 0,
        border: {
          xs: "none",
          md: "1px solid var(--border)",
        },
        boxShadow: {
          xs: "none",
          md: "0 5px 5px 0 rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Grid
        container
        spacing={{
          xs: 4,
          md: 2,
        }}
        sx={{
          padding: {
            xs: "32px 0px",
            md: "32px 32px",
          },
        }}
      >
        {articleList.map((post) => (
          <Grid item xs={12} sm={6} key={post.id}>
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
    </CustomBox>
  )
}
