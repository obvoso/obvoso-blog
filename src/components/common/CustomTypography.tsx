import Typography from "@mui/material/Typography"

type TypograhpyProps = {
  children: React.ReactNode
  color?: string
  size?: number
  weight?: number
  sx?: object
}

export default function CustomTypography({
  children,
  color = "var(--text)",
  size = 14,
  weight = 400,
  sx = {},
}: TypograhpyProps) {
  return (
    <Typography
      variant="h6"
      sx={{
        color: color,
        fontSize: size,
        fontWeight: weight,
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}
