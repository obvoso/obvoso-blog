import React from "react"
import { Box } from "@mui/material"
import ThemeToggle from "@/app/components/layout/ThemeToggle"
import Image from "next/image"
import star from "@/assets/images/star.svg"
import MobileZukebox from "./MobileZukebox"
import CustomTypography from "@/app/components/common/CustomTypography"

export default async function MobileHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        width: "100vw",
        position: "fixed",
        inset: 0,
        height: "fit-content",
        zIndex: 1,
        background: "var(--background)",
      }}
    >
      <MobileZukebox />
      <CustomTypography
        color="var(--gray)"
        size={20}
        sx={{
          letterSpacing: "-0.02em",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%) scaleX(0.9)",
        }}
      >
        obvoso
      </CustomTypography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Image src={star} alt="star" width={26} height={26} />
        <ThemeToggle scale={0.8} />
      </Box>
    </Box>
  )
}
