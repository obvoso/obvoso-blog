"use client"

import {
  Box,
  FormControlLabel,
  Switch,
  SwitchProps,
  styled,
} from "@mui/material"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 72,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    color: "red",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(46px)",
      "& .MuiSwitch-thumb": {
        background: "var(--dark-radial-primary-gradient)",
      },
      "& + .MuiSwitch-track": {
        background: "var(--primary-gradient)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      border: "6px solid #fff",
    },
  },
  "& .MuiSwitch-thumb": {
    background: "var(--radial-primary-gradient)",
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    background:
      theme.palette.mode === "light"
        ? "var(--hover-primary-gradient)"
        : "var(--primary-gradient)",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}))

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <FormControlLabel
        control={<IOSSwitch checked={resolvedTheme === "dark"} />}
        label=""
        sx={{ margin: 0 }}
        onClick={() => {
          setTheme(resolvedTheme === "light" ? "dark" : "light")
        }}
      />
    </Box>
  )
}
