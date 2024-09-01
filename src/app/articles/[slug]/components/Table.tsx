import React from "react"

type TableProps = {
  children: React.ReactNode
}

export function Table({
  children,
  ...props
}: TableProps & React.HTMLProps<HTMLTableElement>) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        borderSpacing: 0,
        borderRadius: 16,
        boxShadow: "0 3px 5px rgba(0,0,0,0.12), 0 3px 5px rgba(0,0,0,0.19)",
      }}
      {...props}
    >
      {children}
    </table>
  )
}

Table.Th = function TableTh({
  children,
  ...props
}: TableProps & React.HTMLProps<HTMLTableCellElement>) {
  return (
    <th
      style={{
        padding: "0.75rem",
        textAlign: "left",
      }}
      {...props}
    >
      {children}
    </th>
  )
}

Table.Td = function TableTd({
  children,
  ...props
}: TableProps & React.HTMLProps<HTMLTableCellElement>) {
  return (
    <td
      style={{
        padding: "0.75rem",
        textAlign: "left",
        borderTop: "1px solid var(--border)",
      }}
      {...props}
    >
      {children}
    </td>
  )
}
