"use client"

import { Box, styled } from "@mui/material"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

function BorderRadius({
  children,
  scale = 1,
}: {
  children: React.ReactNode
  scale?: number
}) {
  return (
    <Box
      sx={{
        background: "var(--silver-gradient)",
        padding: 0.5 * scale,
        borderRadius: (26 / 2) * scale,
        boxShadow: `${scale}px ${scale * 2}px ${scale * 2}px rgba(0, 0, 0, 0.3)`,
      }}
    >
      {children}
    </Box>
  )
}

const ToggleContainer = styled(Box)(
  ({ checked, scale = 1 }: { checked: boolean; scale?: number }) => ({
    width: 72 * scale,
    height: 26 * scale,
    borderRadius: (26 / 2) * scale,
    background: checked
      ? "var(--primary-gradient)"
      : "var(--hover-primary-gradient)",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: `inset ${2 * scale}px ${2 * scale}px ${3 * scale}px rgba(0, 0, 0, 0.3)`,
  }),
)

const ToggleThumb = styled(Box)(
  ({ checked, scale = 1 }: { checked: boolean; scale?: number }) => ({
    width: 22 * scale,
    height: 22 * scale,
    borderRadius: "50%",
    background: checked
      ? "var(--dark-radial-primary-gradient)"
      : "var(--radial-primary-gradient)",
    position: "absolute",
    top: 2 * scale,
    left: checked ? `${46 * scale}px` : `${2 * scale}px`,
    transition: "left 0.3s ease",
    boxShadow: `0px ${2 * scale}px ${4 * scale}px rgba(0, 0, 0, 0.2)`,
  }),
)

export default function ThemeToggle({ scale = 1 }: { scale?: number }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setMounted(true)
    setChecked(resolvedTheme === "dark")
  }, [resolvedTheme])

  if (!mounted) {
    return null
  }

  const handleToggle = () => {
    setChecked(!checked)
    setTheme(checked ? "light" : "dark")
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={handleToggle}
    >
      <BorderRadius scale={scale}>
        <ToggleContainer checked={checked} scale={scale}>
          <ToggleThumb checked={checked} scale={scale} />
        </ToggleContainer>
      </BorderRadius>
    </Box>
  )
}
