import { AppBar, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "var(--background)",
        color: "var(--primary)",
        boxShadow: "none",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/">
          <Typography variant="h6">obvoso blog</Typography>
        </Link>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  )
}
