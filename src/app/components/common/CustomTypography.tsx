import Typography from "@mui/material/Typography"

type TypograhpyProps = {
  children: React.ReactNode
  color?: string
  size?: number | string
  weight?: number
  sx?: object
  fontFamily?: string
}

export default function CustomTypography({
  children,
  color = "var(--text)",
  size = 14,
  weight = 400,
  sx = {},
  fontFamily,
}: TypograhpyProps) {
  const customSx: {
    color: string
    fontSize: number | string
    fontWeight: number
    fontFamily?: string
  } = {
    color,
    fontSize: size,
    fontWeight: weight,
    ...sx,
  }

  if (fontFamily) {
    customSx.fontFamily = "var(--noto)"
  }
  return <Typography sx={customSx}>{children}</Typography>
}
