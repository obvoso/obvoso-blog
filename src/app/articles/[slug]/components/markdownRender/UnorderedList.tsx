"use client"

import React, { createContext, useContext } from "react"
import Box from "@mui/material/Box"

const ListContext = createContext(true)
const useIsTopLevel = () => useContext(ListContext)

type ListProps = {
  children: React.ReactNode
}

function ListWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        padding: "1.5rem",
        backgroundColor: "var(--background-secondary)",
        borderRadius: 4,
        color: "var(--tertiary)",
      }}
    >
      {children}
    </Box>
  )
}

export default function UnorderedList({ children }: ListProps) {
  const isTopLevel = useIsTopLevel()

  return (
    <ListContext.Provider value={false}>
      {isTopLevel ? (
        <ListWrapper>
          <ul style={{ paddingLeft: "1.75rem" }}>{children}</ul>
        </ListWrapper>
      ) : (
        <ul style={{ paddingLeft: "1.75rem" }}>{children}</ul>
      )}
    </ListContext.Provider>
  )
}
