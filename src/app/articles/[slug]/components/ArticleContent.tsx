import { Box } from "@mui/material"
import Markdown from "react-markdown"
// eslint-disable-next-line import/no-extraneous-dependencies
import styles from "@/app/articles/[slug]/page.styles.module.css"
import { getArticleData } from "@/lib/api/article"

import { rehypeSection } from "@/lib/utils/heading"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import Anchor from "./markdownRender/Anchor"
import BlockQuote from "./markdownRender/BlockQuote"
import Code from "./markdownRender/Code"
import Image from "./markdownRender/Image"
import OrderedList from "./markdownRender/OrderedList"
import { Table } from "./markdownRender/Table"
import UnorderedList from "./markdownRender/UnorderedList"
import { TableOfContents } from "./toc/TableOfContents"

type ArticleProps = {
  slug: string
}

export default async function ArticleContent({ slug }: ArticleProps) {
  const { post, headings } = await getArticleData(slug)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingY: 4,
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      <TableOfContents initialHeadings={headings} />

      <Markdown
        remarkPlugins={[remarkBreaks, remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight, rehypeRaw, rehypeSection]}
        components={{
          section: ({ id, children }) => <section id={id}>{children}</section>,
          h1: ({ id, children }) => (
            <h1 id={id} className={styles.h1}>
              {children}
            </h1>
          ),
          h2: ({ id, children }) => (
            <h2 id={id} className={styles.h2}>
              {children}
            </h2>
          ),
          h3: ({ id, children }) => (
            <h3 id={id} className={styles.h3}>
              {children}
            </h3>
          ),
          a: ({ id, children, ...props }) => (
            // eslint-disable-next-line react/prop-types
            <Anchor href={props.href}>{children}</Anchor>
          ),
          blockquote: ({ children, ...props }) => (
            <BlockQuote {...props}>{children}</BlockQuote>
          ),
          ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
          ol: ({ children }) => <OrderedList>{children}</OrderedList>,
          li: ({ children }) => <li className={styles.li}>{children}</li>,
          table: ({ children, ...props }) => (
            <Table {...props}>{children}</Table>
          ),
          th: ({ children, ...props }) => (
            <Table.Th {...props}>{children}</Table.Th>
          ),
          td: ({ children, ...props }) => (
            <Table.Td {...props}>{children}</Table.Td>
          ),
          strong: ({ children }) => (
            <strong className={styles.strong}>{children}</strong>
          ),
          code: ({ className, children, ...props }) => (
            <Code className={className} {...props}>
              {children}
            </Code>
          ),
          img: ({ src, alt }) => <Image src={src!} alt={alt!} />,
          p: ({ children }) => <p className={styles.p}>{children}</p>,
        }}
      >
        {post}
      </Markdown>
    </Box>
  )
}
