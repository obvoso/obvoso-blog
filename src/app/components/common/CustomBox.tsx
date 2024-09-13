import { Box } from "@mui/material"

type CustumBoxProps = {
  children: React.ReactNode
  sx?: object
}

export default function CustomBox({ children, sx }: CustumBoxProps) {
  return (
    <Box
      sx={{
        border: "1px solid var(--border)",
        borderRadius: 8,
        paddingX: 4,
        paddingBottom: 4,
        boxShadow: "0 5px 5px 0 rgba(0, 0, 0, 0.2)",
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
