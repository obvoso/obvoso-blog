"use client"

import styles from "@/app/articles/[slug]/page.styles.module.css"
import Box from "@mui/material/Box"
import React, { createContext, useContext } from "react"

const ListContext = createContext(true)
const useIsTopLevel = () => useContext(ListContext)

type ListProps = {
  children: React.ReactNode
}

function ListWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        margin: "1rem 0 1rem 0",
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
          <ul className={styles.ul}>{children}</ul>
        </ListWrapper>
      ) : (
        <ul className={styles.ul}>{children}</ul>
      )}
    </ListContext.Provider>
  )
}
