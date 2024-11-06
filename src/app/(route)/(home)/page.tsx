import { Box } from "@mui/material"
import ArticlesList from "./articleSection/ArticlesList"
import HotArticle from "./hotArticleSection/HotArticle"
import DesktopSideProfile from "./profileSection/DesktopSideProfile"
import DesktopTagNavigation from "./tagSection/desktop/DesktopTagNavigation"
import MobileTagNavigation from "./tagSection/mobile/MobileTagNavigation"

export default async function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        flexGrow: 1,
        flexDirection: { xs: "column", md: "row" },
        paddingTop: {
          xs: "40px",
          sm: "80px",
          md: "160px",
        },
      }}
    >
      <DesktopSideProfile />
      <MobileTagNavigation />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: {
            xs: "1rem",
            md: "2rem",
          },
        }}
      >
        <HotArticle />
        <DesktopTagNavigation />
        <ArticlesList />
      </Box>
    </Box>
  )
}
