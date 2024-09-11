import { Box, Container } from "@mui/material"
import HomeDesktop from "./desktop/HomeDesktop"
import HomeMobile from "./mobile/HomeMobile"

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
        <HomeDesktop />
        <HomeMobile />
        {/* <DesktopTagNavigation />
        <MobileTagNavigation />
        <ArticlesList /> */}
      </Box>
    </Container>
  )
}
