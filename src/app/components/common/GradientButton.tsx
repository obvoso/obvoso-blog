import { Box, Button } from "@mui/material"
import CustomTypography from "./CustomTypography"

type GradientButtonProps = {
  text: string
  onClick: () => void
  isSelected?: boolean
  size?: number | string
}

export default function GradientButton({
  text,
  onClick,
  isSelected,
  size,
}: GradientButtonProps) {
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
      <Button
        onClick={onClick}
        style={{ textTransform: "none" }}
        sx={{
          justifyContent: "center",
          borderRadius: 100,
          boxShadow: "inset 1px 2px 6px rgba(0, 0, 0, 0.3)",
          background: `${isSelected ? "var(--hover-primary-gradient)" : "var(--primary-gradient)"}`,
          padding: "5px 20px",
          "&:hover": {
            background: "var(--hover-primary-gradient)",
          },
        }}
      >
        <CustomTypography
          size={size ? size : 16}
          color="white"
          sx={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
          }}
        >
          {text}
        </CustomTypography>
      </Button>
    </Box>
  )
}
