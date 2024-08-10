"use client"

import { selectTagsState } from "@/app/atoms/selectCategoryTags"
import { NotionData } from "@/types/notion"
import { TagEnum } from "@/types/tags"
import { Box, Typography } from "@mui/material"
import Image from "next/image"
import { useRecoilValue } from "recoil"

type ArticleProps = {
  article: NotionData
}

export default function ArticleThumbnail({ article }: ArticleProps) {
  const tag = useRecoilValue(selectTagsState)
  if (
    tag.tagName !== "전체보기" &&
    ((tag.type === TagEnum.TAG && !article.tag.includes(tag.tagName)) ||
      (tag.type === TagEnum.CATEGORY && article.category !== tag.tagName))
  )
    return null

  console.log("article", article)
  return (
    <Box padding={4}>
      <Typography variant="h5">{article.title}</Typography>
      <Typography variant="body1">{article.description}</Typography>
      <Image src={article.thumbnail} alt="thumbnail" width={100} height={100} />
    </Box>
  )
}
