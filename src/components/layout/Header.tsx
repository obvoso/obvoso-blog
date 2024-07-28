import { AppBar } from "@mui/material"

export default function Header() {
  return (
    <AppBar position="static">
      <h1>obvoso blog</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </AppBar>
  )
}
