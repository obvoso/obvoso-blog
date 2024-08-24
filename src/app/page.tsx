import ArticlesList from "@/components/home/article/ArticlesList"
import MobileTagNavigation from "@/components/tagSection/MobileTagNavigation"
import TagNavigation from "@/components/tagSection/TagNavigation"
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
        <TagNavigation />
        <MobileTagNavigation />
        <ArticlesList />
      </Box>
    </Container>
  )
}
