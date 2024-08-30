"use client"

type BlockQuoteProps = {
  children: React.ReactNode
} & React.HTMLProps<HTMLQuoteElement>

export default function BlockQuote({ children, ...props }: BlockQuoteProps) {
  return (
    <blockquote
      {...props}
      style={{
        borderLeft: "4px solid var(--primary)",
        backgroundColor: "var(--background-secondary)",
        margin: "1rem 0",
        padding: "0.5rem 1rem",
      }}
    >
      {children}
    </blockquote>
  )
}
