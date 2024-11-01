import Typography from "@mui/material/Typography"

type TypograhpyProps = {
  children: React.ReactNode
  color?: string
  size?: number | string
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
  const customSx: {
    color: string
    fontSize: number | string
    fontWeight: number
  } = {
    color,
    fontSize: size,
    fontWeight: weight,
    ...sx,
  }

  return (
    <Typography className={className} sx={customSx}>
      {children}
    </Typography>
  )
}
