"use client"

import CustomTypography from "@/app/components/common/CustomTypography"
import ThemeToggle from "@/app/components/layout/ThemeToggle"
import star from "@/assets/images/star.svg"
import { onClickGithub } from "@/lib/utils/utils"
import { Box, Tooltip, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import MobileZukebox from "./MobileZukebox"

export default function MobileHeader() {
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [show, setShow] = useState(false)

  useEffect(() => {
    const isArticlePage = pathname.startsWith("/articles")
    setShow(isMobile || isArticlePage)
  }, [pathname, isMobile])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        inset: 0,
        height: "fit-content",
        zIndex: 2,
        background: "var(--silver-gradient)",
        visibility: show ? "visible" : "hidden",
        borderRadius: "0 0 10px 10px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "5px 32px",
          maxWidth: 1200,
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
          <Link href="/">obvoso</Link>
        </CustomTypography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Tooltip title="Go to GitHub" arrow>
            <Image
              src={star}
              alt="star"
              width={26}
              height={26}
              onClick={onClickGithub}
            />
          </Tooltip>
          <ThemeToggle scale={0.8} />
        </Box>
      </Box>
    </Box>
  )
}
