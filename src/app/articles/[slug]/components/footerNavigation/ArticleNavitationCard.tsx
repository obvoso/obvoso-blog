"use client"
import { NotionData } from "@/types/notion"
import { Box } from "@mui/material"

export default function ArticleNavitationCard({
  title,
  slug,
  description,
  createdTime,
}: NotionData) {
  return (
    <Box sx={{ paddingTop: 4, background: "var(--gray)" }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{createdTime}</p>
    </Box>
  )
}
