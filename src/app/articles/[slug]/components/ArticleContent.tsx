import { getArticleData } from "@/lib/api/article"
import { Box } from "@mui/material"
import Markdown from "react-markdown"
// eslint-disable-next-line import/no-extraneous-dependencies
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import "../page.styles.css"
import Anchor from "./markdownRender/Anchor"
import BlockQuote from "./markdownRender/BlockQuote"
import Code from "./markdownRender/Code"
import Image from "./markdownRender/Image"
import OrderedList from "./markdownRender/OrderedList"
import { Table } from "./markdownRender/Table"
import UnorderedList from "./markdownRender/UnorderedList"

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
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      <Markdown
        remarkPlugins={[remarkBreaks, remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ id, children }) => <h1 id={id}>{children}</h1>,
          h2: ({ id, children }) => <h2 id={id}>{children}</h2>,
          h3: ({ id, children }) => <h3 id={id}>{children}</h3>,
          a: ({ id, children, ...props }) => (
            // eslint-disable-next-line react/prop-types
            <Anchor href={props.href}>{children}</Anchor>
          ),
          blockquote: ({ children, ...props }) => (
            <BlockQuote {...props}>{children}</BlockQuote>
          ),
          ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
          ol: ({ children }) => <OrderedList>{children}</OrderedList>,
          li: ({ children, ...props }) => <li {...props}>{children}</li>,
          table: ({ children, ...props }) => (
            <Table {...props}>{children}</Table>
          ),
          th: ({ children, ...props }) => (
            <Table.Th {...props}>{children}</Table.Th>
          ),
          td: ({ children, ...props }) => (
            <Table.Td {...props}>{children}</Table.Td>
          ),
          strong: ({ children, ...props }) => (
            <strong {...props}>{children}</strong>
          ),
          code: ({ className, children, ...props }) => (
            <Code className={className} {...props}>
              {children}
            </Code>
          ),
          img: ({ src, alt }) => <Image src={src!} alt={alt!} />,
        }}
      >
        {post}
      </Markdown>
    </Box>
  )
}
