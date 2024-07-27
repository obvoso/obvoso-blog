import { getArticleData } from "@/services/article"
import { getAll } from "@/services/notion"
import { ArticleProps } from "@/types/article"
import { NotionData } from "@/types/notion"
import "highlight.js/styles/hybrid.css"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import "./Article.css"

export default async function Article({ params }: ArticleProps) {
  const post = await getArticleData(params.slug)
  const markdown = `
  * 상위 리스트1
    * 하위 리스트1
    * 하위 리스트2
      * 하위의 하위 리스트1
      * 하위의 하위 리스트2
  `
  console.log(post)
  return (
    <main className="article-container">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
      >
        {markdown}
      </Markdown>
    </main>
  )
}

export async function generateStaticParams() {
  const data = await getAll()

  return data.map((page: NotionData) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: ArticleProps) {
  const data = await getAll()
  const post = data.find((page: NotionData) => page.slug === params.slug)

  return {
    title: post.title,
    slug: post.title,
  }
}
