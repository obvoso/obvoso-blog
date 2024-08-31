import { AppBar, Toolbar, Box } from "@mui/material"
import Link from "next/link"
import { Noto_Serif_KR } from "next/font/google"
import CustomTypography from "../common/CustomTypography"
import AudioHeader from "./AudioHeader"
import ThemeToggle from "./ThemeToggle"

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
})

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
          <CustomTypography className={notoSerifKr.className}>
            obvoso
          </CustomTypography>
        </Link>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
