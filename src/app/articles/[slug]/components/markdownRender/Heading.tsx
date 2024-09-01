import CustomTypography from "@/components/common/CustomTypography"
import React from "react"

type HeadingProps = {
  level: 1 | 2 | 3
  children: React.ReactNode
}

export default function Heading({ level, children }: HeadingProps) {
  const styles = {
    1: { size: 30, weight: 600, marginBottom: "4px", marginTop: "2rem" },
    2: { size: 24, weight: 600, marginBottom: "1px", marginTop: "1.4rem" },
    3: { size: 20, weight: 600, marginBottom: "1px", marginTop: "1rem" },
  }[level]

  return (
    <CustomTypography
      size={styles.size}
      weight={styles.weight}
      sx={{ marginBottom: styles.marginBottom, marginTop: styles.marginTop }}
    >
      {children}
    </CustomTypography>
  )
}
