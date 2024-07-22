import { getNotionData } from "@/services/notion"
import "highlight.js/styles/hybrid.css"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"

export async function Post({ id }: { id: string }) {
  const post: string = await getNotionData(id)
  console.log(post)
  return (
    <div>
      <Markdown
        remarkPlugins={[remarkGfm, remarkRehype]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
      >
        {post}
      </Markdown>
    </div>
  )
}
