import BlurImage from "@/components/common/BlurImage"
import CustomTypography from "@/components/common/CustomTypography"
import { NotionData } from "@/types/notion"
import { Box } from "@mui/material"
import { notoSerifKr } from "@/styles/font"

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
        <CustomTypography
          size={20}
          weight={700}
          className={notoSerifKr.className}
        >
          {article.title}
        </CustomTypography>
        <CustomTypography
          size={17}
          weight={500}
          color="var(--text-secondary)"
          className={notoSerifKr.className}
          sx={{ paddingTop: 1 }}
        >
          {article.description}
        </CustomTypography>
        <CustomTypography
          size={14}
          color="gray"
          className={notoSerifKr.className}
        >
          {article.createdTime}
        </CustomTypography>
      </Box>
    </Box>
  )
}
