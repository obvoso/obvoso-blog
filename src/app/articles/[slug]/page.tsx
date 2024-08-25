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
        rehypePlugins={[rehypeHighlight, rehypeRaw, remarkGfm]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 {...props} style={{ fontSize: "2rem", fontWeight: "700" }}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 {...props} style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 {...props} style={{ fontSize: "1.25rem", fontWeight: "500" }}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p {...props} style={{ fontSize: "1rem", fontWeight: "400" }}>
              {children}
            </p>
          ),
          a: ({ children, ...props }) => (
            <a {...props} style={{ color: "var(--primary)" }}>
              {children}
            </a>
          ),
          img: ({ children, ...props }) => (
            <img {...props} style={{ maxWidth: "100%" }} />
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              {...props}
              style={{
                borderLeft: "4px solid var(--primary)",
                backgroundColor: "var(--imsi)",
                paddingLeft: "1rem",
                margin: "1rem 0",
              }}
            >
              {children}
            </blockquote>
          ),
          ul: ({ children, ...props }) => (
            <ul {...props} style={{ paddingLeft: "1rem" }}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol {...props} style={{ paddingLeft: "1rem" }}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li {...props} style={{ marginBottom: "0.5rem" }}>
              {children}
            </li>
          ),
          table: ({ children, ...props }) => (
            <table
              {...props}
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderSpacing: 0,
              }}
            >
              {children}
            </table>
          ),
          th: ({ children, ...props }) => (
            <th
              {...props}
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              {...props}
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {children}
            </td>
          ),
          strong: ({ children, ...props }) => (
            <strong {...props} style={{ fontWeight: "bold" }}>
              {children}
            </strong>
          ),
          code: ({ className, children, ...props }) => {
            // className이 없으면 인라인 코드, 있으면 블록 코드로 가정
            const isInline = !className

            return isInline ? (
              <code
                {...props}
                style={{
                  backgroundColor: "var(--imsi)",
                  padding: "0.2rem 0.4rem",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                  fontFamily: "monospace",
                  color: "var(--primary)",
                }}
              >
                {children}
              </code>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          },
        }}
      >
        {post}
      </Markdown>
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
