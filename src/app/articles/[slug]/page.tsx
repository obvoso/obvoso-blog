import { getAllPost } from "@/lib/api/notion"
import { NotionData } from "@/types/notion"
import Box from "@mui/material/Box"
import "highlight.js/styles/hybrid.css"
import ArticleContent from "./components/ArticleContent"
import ArticleHeader from "./components/ArticleHeader"

type ArticleProps = {
  params: {
    slug: string
  }
}

export default async function Article({ params }: ArticleProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <ArticleHeader slug={params.slug} />
        <ArticleContent slug={params.slug} />
      </Box>
    </Box>
  )
}

export async function generateStaticParams() {
  const data: NotionData[] = await getAllPost()
  return data.map((page: NotionData) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: ArticleProps) {
  const data = await getAllPost()
  const decodeSlug = decodeURIComponent(params.slug)
  const post = data.find(
    (page: NotionData) => page.slug === decodeSlug || page.slug === params.slug,
  )

  return data.map((page: NotionData) => ({
    slug: post?.title,
  }))
}
