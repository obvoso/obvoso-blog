// "use client"

import BlurImage from "@/components/common/BlurImage"
import { NotionData } from "@/types/notion"
import { Box, Typography } from "@mui/material"

type ArticleProps = {
  article: NotionData
}

export default function ArticleThumbnail({ article }: ArticleProps) {
  return (
    <Box padding={4}>
      <Typography variant="h5">{article.title}</Typography>
      <Typography variant="body1">{article.description}</Typography>
      <BlurImage
        src={article.thumbnail!}
        blurDataURL={article.blurThumbnail!}
      />
    </Box>
  )
}
