import React from "react"

type CodeProps = {
  children: React.ReactNode
} & React.HTMLProps<HTMLElement>

export default function Code({
  children,
  className,
  ...props
}: CodeProps & React.HTMLProps<HTMLElement>) {
  // className이 없으면 인라인 코드, 있으면 블록 코드로 가정
  const isInline = !className

  return isInline ? (
    <code
      {...props}
      style={{
        backgroundColor: "var(--background-tertiary)",
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
    <code
      {...props}
      className={className}
      style={{
        marginBottom: "1rem",
      }}
    >
      {children}
    </code>
  )
}
