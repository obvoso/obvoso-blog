import React from "react"
import MobileHeader from "./MobileHeader"
import MobileTagNavigation from "./MobileTagNavigation"
import { Box } from "@mui/material"

export default function MobileTop() {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        flexDirection: "column",
        padding: 1,
      }}
    >
      <MobileHeader />
      <MobileTagNavigation />
    </Box>
  )
}
