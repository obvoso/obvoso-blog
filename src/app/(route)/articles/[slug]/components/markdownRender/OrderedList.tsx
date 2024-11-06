import "@/app/(route)/articles/[slug]/page.styles.css"
import React from "react"

type ListProps = {
  children: React.ReactNode
}

export default function OrderedList({ children }: ListProps) {
  return <ol className="ol">{children}</ol>
}
