import ArticlesList from "@/components/home/article/ArticlesList"
import TagNavigation from "@/components/tagSection/TagNavigation"
import { Box, Container } from "@mui/material"

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TagNavigation />
        <ArticlesList />
      </Box>
    </Container>
  )
}
