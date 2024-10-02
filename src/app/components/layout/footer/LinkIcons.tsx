"use client"

import { onClickGithub } from "@/lib/utils/utils"
import { GitHub } from "@mui/icons-material"
import { Box, Button } from "@mui/material"

export default function LinkIcons() {
  return (
    <Box>
      <Button
        color="inherit"
        disableRipple
        onClick={onClickGithub}
        sx={{
          "&:hover": {
            background: "none",
          },
        }}
      >
        <GitHub />
      </Button>
    </Box>
  )
}
