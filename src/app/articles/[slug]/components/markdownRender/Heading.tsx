import CustomTypography from "@/components/common/CustomTypography"
import React from "react"

type HeadingProps = {
  level: 1 | 2 | 3 | 4
  children: React.ReactNode
}

export default function ({ level, children }: HeadingProps) {
  const styles = {
    1: { size: 32, weight: 700, marginBottom: "1.5rem", marginTop: "2rem" },
    2: { size: 28, weight: 600, marginBottom: "1.25rem", marginTop: "1.5rem" },
    3: { size: 24, weight: 500, marginBottom: "1rem", marginTop: "1.25rem" },
    4: { size: 20, weight: 400, marginBottom: "0.75rem", marginTop: "1rem" },
  }[level]

  return (
    <CustomTypography
      size={styles.size}
      weight={styles.weight}
      sx={{ marginBottom: styles.marginBottom }}
    >
      {children}
    </CustomTypography>
  )
}
