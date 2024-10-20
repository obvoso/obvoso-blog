import styles from "@/app/articles/[slug]/page.styles.module.css"
import React from "react"

type ListProps = {
  children: React.ReactNode
}

export default function OrderedList({ children }: ListProps) {
  return <ol className={styles.ol}>{children}</ol>
}
