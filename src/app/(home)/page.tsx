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
        height: "100%",
        flexGrow: 1,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <DesktopSideProfile />
      <MobileTagNavigation />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: 4,
        }}
      >
        <HotArticle />
        <DesktopTagNavigation />
        <ArticlesList />
      </Box>
    </Box>
  )
}
