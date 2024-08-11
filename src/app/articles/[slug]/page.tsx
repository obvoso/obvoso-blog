import { getArticleData } from "@/services/article"
import { getAllPost } from "@/services/notion"
import { NotionData } from "@/types/notion"
import Box from "@mui/material/Box"
import "highlight.js/styles/hybrid.css"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

type ArticleProps = {
  params: { slug: string }
}

export default async function Article({ params }: ArticleProps) {
  const post = await getArticleData(params.slug)

  return (
    <Box>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
      >
        {post}
      </Markdown>
    </Box>
  )
}

export async function generateStaticParams() {
  const data = await getAllPost()
  data.forEach((page: NotionData) => {
    console.log("--", page.slug)
  })
  return data.map((page: NotionData) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: ArticleProps) {
  const data = await getAllPost()
  const post = data.find((page: NotionData) => page.slug === params.slug)

  return {
    title: post?.title,
    slug: post?.title,
  }
}
