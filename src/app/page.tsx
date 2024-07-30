import Articles from "@/components/home/Articles"
import TagVerticalNavigation from "@/components/layout/TagVerticalNavigation"
import { getAllPost } from "@/services/notion"
import { Box, Container } from "@mui/material"

export default async function Home() {
  const data = await getAllPost()

  return (
    <Container maxWidth="lg">
      <Box
        component="main"
        sx={{ p: 20, display: "flex", flexDirection: "row" }}
      >
        <TagVerticalNavigation />
        <Box sx={{ px: 20 }}>
          <Articles />
        </Box>
      </Box>
    </Container>
  )
}

{
  /* <ul>
{data.map((page: any) => {
  return (
    <li key={page.id}>
      <Link href={`/articles/${page.slug}`}>{page.title}</Link>
    </li>
  )
})}
</ul> */
}
