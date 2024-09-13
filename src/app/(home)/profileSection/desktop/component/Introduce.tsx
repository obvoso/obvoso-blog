"use client"
import CustomBox from "@/app/components/common/CustomBox"
import CustomTypography from "@/app/components/common/CustomTypography"
import GradientButton from "@/app/components/common/GradientButton"
import StarTextBox from "@/app/components/common/StarTextBox"
import { Box } from "@mui/material"

export default function Introduce() {
  const onClickButton = () => {
    window.open("https://github.com/obvoso", "_blank")
  }
  return (
    <CustomBox sx={{ borderRadius: "8px 8px 16px 16px ", padding: 0 }}>
      <StarTextBox text="See My Profile" />
      <Box sx={{ paddingX: 4, paddingY: 3 }}>
        <CustomTypography>obvoso</CustomTypography>
        <CustomTypography>안뇽허삽니까</CustomTypography>
        <GradientButton text="GitHub" onClick={onClickButton} />
        <CustomTypography>FrontEnd Developer</CustomTypography>
      </Box>
    </CustomBox>
  )
}
