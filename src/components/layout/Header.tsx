import { AppBar, Toolbar, Typography } from "@mui/material"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--primary)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">obvoso blog</Typography>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  )
}
