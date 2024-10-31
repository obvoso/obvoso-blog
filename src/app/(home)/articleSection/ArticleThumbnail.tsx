import BlurImage from "@/app/components/common/BlurImage"
import CustomBox from "@/app/components/common/CustomBox"
import CustomTypography from "@/app/components/common/CustomTypography"
import { NotionData } from "@/types/notion"
import { Box } from "@mui/material"

type ArticleProps = {
  article: NotionData
}

export default function ArticleThumbnail({ article }: ArticleProps) {
  return (
    <CustomBox
      sx={{
        borderRadius: 2,
        padding: 2,
        background: "var(--background)",
      }}
    >
      <BlurImage src={article.thumbnail} blurDataURL={article.blurThumbnail} />
      <Box
        padding={1}
        paddingTop={3}
        sx={{
          minHeight: { xs: 0, sm: "147px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CustomTypography
          size={20}
          weight={700}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textOverflow: "ellipsis",
            flex: 1,
          }}
        >
          {article.title}
        </CustomTypography>
        <CustomTypography
          size={17}
          weight={500}
          color="var(--text-secondary)"
          sx={{
            paddingTop: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {article.description}
        </CustomTypography>
        <CustomTypography size={14} color="gray">
          {article.createdTime}
        </CustomTypography>
      </Box>
    </CustomBox>
  )
}
