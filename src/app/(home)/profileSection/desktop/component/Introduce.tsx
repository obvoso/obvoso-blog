"use client"

import CustomBox from "@/app/components/common/CustomBox"
import CustomTypography from "@/app/components/common/CustomTypography"
import GradientBox from "@/app/components/common/GradientBox"
import StarTextBox from "@/app/components/common/StarTextBox"
import { onClickGithub } from "@/lib/utils/utils"
import { Box } from "@mui/material"

export default function Introduce() {
  return (
    <CustomBox sx={{ borderRadius: "8px 8px 16px 16px ", padding: 0 }}>
      <StarTextBox text="See My Profile" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 0.5,
          paddingY: 2,
        }}
      >
        <CustomTypography size={24} weight={600}>
          obvoso
        </CustomTypography>
        <CustomTypography>안뇽허삽니까</CustomTypography>
        <GradientBox type={"button"} onClick={onClickGithub}>
          <CustomTypography
            size={16}
            color="white"
            sx={{
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
            }}
          >
            GitHub
          </CustomTypography>
        </GradientBox>
        <CustomTypography sx={{ marginTop: 1 }}>
          FrontEnd Developer
        </CustomTypography>
      </Box>
    </CustomBox>
  )
}
