import { AppBar, Box, Toolbar } from "@mui/material"
import Link from "next/link"
import AudioHeader from "../../(home)/profileSection/desktop/component/DesktopZukebox"
import CustomTypography from "../common/CustomTypography"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "var(--background)",
        boxShadow: "none",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ flex: 1 }}>
          <AudioHeader />
        </Box>
        <Link href="/">
          <CustomTypography fontFamily="var(--noto)">obvoso</CustomTypography>
        </Link>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
