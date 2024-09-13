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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        padding: 1,
        background: "var(--silver-gradient)",
        boxShadow: 2,
      }}
    >
      <Button
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.1)",
          background: "var(--primary-gradient)",
          color: "var(--text)",
          padding: "2px 4px",
          "&:hover": {
            backgroundColor: "var(--hover-primary-gradient)",
          },
        }}
      >
        <CustomTypography
          sx={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          {text}
        </CustomTypography>
      </Button>
    </Box>
  )
}
