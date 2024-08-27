type ListProps = {
  children: React.ReactNode
  listType?: "ul" | "ol"
}

export default function List({ children, listType }: ListProps) {
  if (listType === "ol") {
    return <ol style={{ paddingLeft: "1rem" }}>{children}</ol>
  }
  return <ul style={{ paddingLeft: "1rem" }}>{children}</ul>
}
