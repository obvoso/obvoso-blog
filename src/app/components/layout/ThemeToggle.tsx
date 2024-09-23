"use client"

import { Box, styled } from "@mui/material"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

function BorderRadius({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        background: "var(--silver-gradient)",
        padding: 0.5,
        borderRadius: 26 / 2,
        boxShadow: "1px 3px 3px rgba(0, 0, 0, 0.3)",
      }}
    >
      {children}
    </Box>
  )
}

const ToggleContainer = styled(Box)(({ checked }: { checked: boolean }) => ({
  width: 72,
  height: 26,
  borderRadius: 26 / 2,
  background: checked
    ? "var(--primary-gradient)"
    : "var(--hover-primary-gradient)",
  position: "relative",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  boxShadow: "inset 2px 2px 3px rgba(0, 0, 0, 0.3)",
}))

const ToggleThumb = styled(Box)(({ checked }: { checked: boolean }) => ({
  width: 22,
  height: 22,
  borderRadius: "50%",
  background: checked
    ? "var(--dark-radial-primary-gradient)"
    : "var(--radial-primary-gradient)",
  position: "absolute",
  top: 2,
  left: checked ? "46px" : "2px",
  transition: "left 0.3s ease",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}))

export default function ThemeToggle() {
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
      <BorderRadius>
        <ToggleContainer checked={checked}>
          <ToggleThumb checked={checked} />
        </ToggleContainer>
      </BorderRadius>
    </Box>
  )
}
