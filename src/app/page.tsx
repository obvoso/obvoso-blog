import Test from "@/components/home/Test"
import { getAllPost } from "@/services/notion"
import { getAllCategory } from "@/services/tags"
import { Container } from "@mui/material"

export default async function Home() {
  const categories = await getAllCategory()
  const posts = await getAllPost()

  return (
    <Container maxWidth="lg">
      <Test initialCategories={categories} initialPosts={posts} />
    </Container>
  )
}
