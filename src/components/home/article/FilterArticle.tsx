"use client"

import { selectTagsState } from "@/atoms/selectCategoryTags"
import { NotionData } from "@/types/notion"
import { TagEnum } from "@/types/tags"
import { Grid } from "@mui/material"
import Link from "next/link"
import { useRecoilValue } from "recoil"
import ArticleThumbnail from "./ArticleThumbnail"

type FilterArticleProps = {
  articles: NotionData[]
}

export default function FilterArticle({ articles }: FilterArticleProps) {
  const tag = useRecoilValue(selectTagsState)
  const filteredData = articles.filter((post) => {
    if (tag.tagName === "전체보기") return true
    if (tag.type === TagEnum.TAG && post.tag.includes(tag.tagName)) return true
    if (tag.type === TagEnum.CATEGORY && post.category === tag.tagName)
      return true
    return false
  })

  return (
    <>
      {filteredData.map((post) => (
        <Grid item xs={12} md={6} key={post.id}>
          <Link href={`/articles/${post.slug}`}>
            <ArticleThumbnail article={post} />
          </Link>
        </Grid>
      ))}
    </>
  )
}
