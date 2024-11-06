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
        "&:hover": {
          "& .custom-typography": {
            color: "var(--secondary)",
          },
          "& .blur-image": {
            transform: "scale(1.07)",
          },
        },
      }}
    >
      <BlurImage
        src={article.thumbnail}
        blurDataURL={article.blurThumbnail}
        className="blur-image"
        imageStyle={{
          transition: "transform 0.3s ease",
        }}
      />
      <Box
        sx={{
          minHeight: { xs: 0, sm: "138px" },
          display: "flex",
          flexDirection: "column",
          paddingTop: { xs: 1.5, sm: 3 },
        }}
      >
        <CustomTypography
          className="custom-typography"
          weight={700}
          sx={{
            fontSize: {
              xs: "16px",
              sm: "20px",
            },
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textOverflow: "ellipsis",
          }}
        >
          {article.title}
        </CustomTypography>
        <CustomTypography
          className="custom-typography"
          weight={500}
          color="var(--text-secondary)"
          sx={{
            fontSize: {
              xs: "13px",
              sm: "17px",
            },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            paddingTop: 1,
          }}
        >
          {article.description}
        </CustomTypography>
        <CustomTypography
          className="custom-typography"
          color="var(--text-secondary)"
          sx={{
            fontSize: {
              xs: "12px",
              sm: "14px",
            },
            paddingTop: 0.5,
          }}
        >
          {article.createdTime}
        </CustomTypography>
      </Box>
    </CustomBox>
  )
}
