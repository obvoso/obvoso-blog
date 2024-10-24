import CustomTypography from "@/app/components/common/CustomTypography"
import { Box } from "@mui/material"

export default function ArticleNotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: {
          xs: "32px 0px",
          md: "32px 32px",
        },
        background: {
          xs: "var(--background-opacity)",
          md: "none",
        },
        marginTop: {
          xs: "32px",
          md: "0px",
        },
      }}
    >
      <CustomTypography size="1rem">
        태그 내 게시글이 없습니다 😂
      </CustomTypography>
    </Box>
  )
}
