import { getAll, getNotionData } from "@/services/notion"
import "highlight.js/styles/hybrid.css"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

export async function generateStaticParams() {
  const data = await getAll()

  return data.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }) {
  const data = await getAll()
  const post = data.find(
    (page) => page.slug === decodeURIComponent(params.slug),
  )

  return {
    title: post.title,
  }
}

export default async function Post({ params }) {
  const data = await getAll()
  const post = await getNotionData(
    data.find((page) => page.slug === decodeURIComponent(params.slug)).id,
  )

  return (
    <div>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
      >
        {post}
      </Markdown>
    </div>
  )
}
