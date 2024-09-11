import { Box } from "@mui/material"

export default function HomeMobile() {
  return (
    <Box
      border={1}
      sx={{
        display: { xs: "flex", sm: "none" },
      }}
    >
      HomeMobile
    </Box>
  )
}
