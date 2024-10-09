import React from "react"

type ListProps = {
  children: React.ReactNode
}

export default function OrderedList({ children }: ListProps) {
  return <ol>{children}</ol>
}
