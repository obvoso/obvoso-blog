import { Box } from "@mui/material"

export default function HomeDesktop() {
  return (
    <Box
      border={1}
      sx={{
        display: { xs: "none", sm: "flex" },
      }}
    >
      HomeDesktop
    </Box>
  )
}
