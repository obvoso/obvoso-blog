import { Box, Button } from "@mui/material"
import CustomTypography from "./CustomTypography"

type GradientButtonProps = {
  text: string
  onClick: () => void
}

export default function GradientButton({ text, onClick }: GradientButtonProps) {
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
          background: "var(--primary-gradient)",
          padding: "5px 20px",
          "&:hover": {
            background: "var(--hover-primary-gradient)",
          },
        }}
      >
        <CustomTypography
          sx={{
            textShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
            fontSize: 16,
            color: "var(--background)",
          }}
        >
          {text}
        </CustomTypography>
      </Button>
    </Box>
  )
}
