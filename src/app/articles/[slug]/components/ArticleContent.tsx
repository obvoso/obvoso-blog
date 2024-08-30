import { getArticleData } from "@/services/article"
import { Box } from "@mui/material"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import Anchor from "./markdownRender/Anchor"
import BlockQuote from "./markdownRender/BlockQuote"
import Heading from "./markdownRender/Heading"
import List from "./markdownRender/List"

type ArticleProps = {
  slug: string
}

export default async function ArticleContent({ slug }: ArticleProps) {
  const post = await getArticleData(slug)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        paddingY: 4,
      }}
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw, remarkGfm]}
        components={{
          h1: ({ children }) => <Heading level={1}>{children}</Heading>,
          h2: ({ children }) => <Heading level={2}>{children}</Heading>,
          h3: ({ children }) => <Heading level={3}>{children}</Heading>,
          h4: ({ children }) => <Heading level={4}>{children}</Heading>,
          a: ({ children, ...props }) => (
            // eslint-disable-next-line react/prop-types
            <Anchor href={props.href}>{children}</Anchor>
          ),
          blockquote: ({ children, ...props }) => (
            <BlockQuote props={props}>{children}</BlockQuote>
          ),
          ul: ({ children }) => <List listType="ul">{children}</List>,
          ol: ({ children }) => <List listType="ol">{children}</List>,
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
                  backgroundColor: "var(--background-secondary)",
                  padding: "0.2rem 0.4rem",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                  fontFamily: "monospace",
                  color: "var(--tertiary)",
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
