import { Box, Button } from "@mui/material"

type GradientBoxProps = {
  children: React.ReactNode
  type: "button" | "box"
  onClick?: () => void
  isSelected?: boolean
}

export default function GradientBox({
  children,
  type,
  onClick,
  isSelected,
}: GradientBoxProps) {
  let backgroundColor
  if (type === "button") {
    backgroundColor = isSelected
      ? "var(--hover-primary-gradient)"
      : "var(--primary-gradient)"
  } else {
    backgroundColor = "var(--gradient)"
  }
  return (
    <Box
      sx={{
        background: "var(--silver-gradient)",
        borderRadius: 100,
        padding: 0.6,
        boxShadow: 2,
        width: "fit-content",
      }}
    >
      <Box
        component={type === "button" ? Button : "div"}
        onClick={onClick}
        style={{ textTransform: "none" }}
        sx={{
          justifyContent: "center",
          borderRadius: 100,
          boxShadow: "inset 1px 2px 6px rgba(0, 0, 0, 0.3)",
          background: backgroundColor,
          padding: type === "button" ? "5px 20px" : "0px",
          "&:hover": {
            background:
              type === "button"
                ? "var(--hover-primary-gradient)"
                : "var(--gradient)",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
