import { getArticleFooterNavigation } from "@/lib/api/article"
import { Box } from "@mui/material"
import ArticleNavigationCard from "./ArticleNavigationCard"

type ArticleFooterNavigationProps = {
  slug: string
}

export default async function ArticleFooterNavigation({
  slug,
}: ArticleFooterNavigationProps) {
  const { prev, next } = await getArticleFooterNavigation(slug)
  let justify = "space-between"
  if (prev && !next) justify = "flex-start"
  if (!prev && next) justify = "flex-end"

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: justify,
        alignItems: "center",
        textAlign: "center",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        paddingTop: 4,
      }}
    >
      {prev && <ArticleNavigationCard {...prev} cardType="이전 포스트" />}
      {next && <ArticleNavigationCard {...next} cardType="다음 포스트" />}
    </Box>
  )
}
