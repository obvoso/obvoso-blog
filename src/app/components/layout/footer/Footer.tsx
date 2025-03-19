import { Box } from "@mui/material"
import CustomTypography from "../../common/CustomTypography"
import LinkIcons from "./LinkIcons"

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <CustomTypography
        size={16}
        sx={{
          letterSpacing: "-0.02em",
          transform: "scaleX(0.9)",
        }}
      >
        obvoso
      </CustomTypography>
      <LinkIcons />
      <CustomTypography weight={200} size={12}>
        ⓒ 2024. obvoso All rights reserved.
      </CustomTypography>
    </Box>
  )
}
