"use client"

import { selectTagsState } from "@/atoms/selectCategoryTags"
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

  return (
    <Box padding={4}>
      <Typography variant="h5">{article.title}</Typography>
      <Typography variant="body1">{article.description}</Typography>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.26%",
        }}
      >
        <Image
          src={article.thumbnail!}
          alt="thumbnail"
          placeholder={"blur"}
          blurDataURL={article.blurThumbnail!}
          priority={true}
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: "10px" }}
        />
      </Box>
    </Box>
  )
}
