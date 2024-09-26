import { Box } from "@mui/material"
import MobileTagNavigation from "./MobileTagNavigation"

export default function MobileTop() {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        flexDirection: "column",
        padding: 1,
      }}
    >
      <MobileTagNavigation />
    </Box>
  )
}
