import Typography from "@mui/material/Typography"

type TypograhpyProps = {
  children: React.ReactNode
  color?: string
  size?: number
  weight?: number
  sx?: object
  className?: string
}

export default function CustomTypography({
  children,
  color = "var(--text)",
  size = 14,
  weight = 400,
  sx = {},
  className,
}: TypograhpyProps) {
  return (
    <Typography
      className={className}
      sx={{
        color,
        fontSize: size,
        fontWeight: weight,
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}
