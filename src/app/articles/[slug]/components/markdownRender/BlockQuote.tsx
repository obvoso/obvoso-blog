type BlockQuoteProps = {
  children: React.ReactNode
  props: any
}

export default function BlockQuote({ children, props }: BlockQuoteProps) {
  console.log(props)
  return (
    <blockquote
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
