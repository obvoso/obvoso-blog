import BlurImage from "@/components/common/BlurImage"
import CustomTypography from "@/components/common/CustomTypography"
import { NotionData } from "@/types/notion"
import { Box } from "@mui/material"

type ArticleProps = {
  article: NotionData
}

export default function ArticleThumbnail({ article }: ArticleProps) {
  return (
    <Box
      padding={0}
      sx={{
        border: "0.5px solid var(--border-secondary)",
      }}
    >
      <BlurImage
        src={article.thumbnail!}
        blurDataURL={article.blurThumbnail!}
        ratio="100%"
      />
      <Box padding={1} paddingTop={3}>
        <CustomTypography size={20} weight={700} fontFamily="var(--noto">
          {article.title}
        </CustomTypography>
        <CustomTypography
          size={17}
          weight={500}
          color="var(--text-secondary)"
          fontFamily="var(--noto"
          sx={{ paddingTop: 1 }}
        >
          {article.description}
        </CustomTypography>
        <CustomTypography size={14} color="gray" fontFamily="var(--noto">
          {article.createdTime}
        </CustomTypography>
      </Box>
    </Box>
  )
}
