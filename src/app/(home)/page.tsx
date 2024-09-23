import { Box } from "@mui/material"
import ArticlesList from "./articleSection/ArticlesList"
import HotArticle from "./hotArticleSection/HotArticle"
import DesktopSideProfile from "./profileSection/desktop/DesktopSideProfile"
import MobileTop from "./profileSection/mobile/MobileTop"

export default async function Home() {
  return (
    <Box
      paddingY={10}
      sx={{
        display: "flex",
        maxHeight: "100vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* mint */}
      <DesktopSideProfile />
      <MobileTop />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* purple */}
        <HotArticle />
        {/* pink */}
        <ArticlesList />
      </Box>
    </Box>
  )
}
