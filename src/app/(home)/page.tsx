import { Box } from "@mui/material"
import ArticlesList from "./articleSection/ArticlesList"
import HotArticle from "./hotArticleSection/HotArticle"
import DesktopSideProfile from "./profileSection/desktop/DesktopSideProfile"
import DesktopTagNavigation from "./tagSection/desktop/DesktopTagNavigation"
import MobileTagNavigation from "./tagSection/mobile/MobileTagNavigation"

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
      <MobileTagNavigation />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* purple */}
        <HotArticle />
        <DesktopTagNavigation />
        {/* pink */}
        <ArticlesList />
      </Box>
    </Box>
  )
}
