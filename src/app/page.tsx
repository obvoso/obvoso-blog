import ArticlesList from "@/components/home/article/ArticlesList"
import DesktopTagNavigation from "@/components/tagSection/desktop/DesktopTagNavigation"
import MobileTagNavigation from "@/components/tagSection/mobile/MobileTagNavigation"
import { Box, Container } from "@mui/material"

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        paddingY={6}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <DesktopTagNavigation />
        <MobileTagNavigation />
        <ArticlesList />
      </Box>
    </Container>
  )
}
