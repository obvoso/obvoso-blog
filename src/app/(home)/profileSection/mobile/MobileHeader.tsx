"use client"

import CustomTypography from "@/app/components/common/CustomTypography"
import ThemeToggle from "@/app/components/layout/ThemeToggle"
import star from "@/assets/images/star.svg"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import MobileZukebox from "./MobileZukebox"

export default function MobileHeader() {
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [show, setShow] = useState(false)

  useEffect(() => {
    const isArticlePage = pathname.startsWith("/articles")
    setShow(isMobile || isArticlePage)
  }, [pathname, isMobile])

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
        visibility: show ? "visible" : "hidden",
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
