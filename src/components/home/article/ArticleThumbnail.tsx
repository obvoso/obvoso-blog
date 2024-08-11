// "use client"

import BlurImage from "@/components/common/BlurImage"
import CustomTypography from "@/components/common/CustomTypography"
import { NotionData } from "@/types/notion"
import { Box } from "@mui/material"

type ArticleProps = {
  article: NotionData
}

export default function ArticleThumbnail({ article }: ArticleProps) {
  return (
    <Box padding={4}>
      <BlurImage
        src={article.thumbnail!}
        blurDataURL={article.blurThumbnail!}
      />
      <Box paddingTop={3}>
        <CustomTypography size={20} weight={700}>
          {article.title}
        </CustomTypography>
        <CustomTypography
          size={17}
          weight={500}
          color="gray"
          sx={{ paddingTop: 1 }}
        >
          {article.description}
        </CustomTypography>
        <CustomTypography size={14} color="gray">
          {article.createdTime}
        </CustomTypography>
      </Box>
    </Box>
  )
}
