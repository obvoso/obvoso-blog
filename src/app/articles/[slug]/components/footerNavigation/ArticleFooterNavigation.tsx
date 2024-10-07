import CustomBox from "@/app/components/common/CustomBox"
import { getArticleFooterNavigation } from "@/lib/api/article"
import { Box } from "@mui/material"
import ArticleNavitationCard from "./ArticleNavitationCard"

type ArticleFooterNavigationProps = {
  slug: string
}

export default async function ArticleFooterNavigation({
  slug,
}: ArticleFooterNavigationProps) {
  const { prev, next } = await getArticleFooterNavigation(slug)
  console.log(prev, next)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {prev && (
        <CustomBox sx={{ flex: 1, maxWidth: "300px", paddingTop: 4 }}>
          <ArticleNavitationCard {...prev} />
        </CustomBox>
      )}

      {next && (
        <CustomBox
          sx={{
            flex: 1,
            textAlign: "right",
            maxWidth: "300px",
            paddingTop: 4,
          }}
        >
          <ArticleNavitationCard {...next} />
        </CustomBox>
      )}
    </Box>
  )
}
