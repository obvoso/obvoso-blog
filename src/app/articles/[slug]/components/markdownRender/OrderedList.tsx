import React, { createContext, useContext } from "react"

type ListProps = {
  children: React.ReactNode
}

export default function OrderedList({ children }: ListProps) {
  return <ol style={{ paddingLeft: "1.75rem" }}>{children}</ol>
}
