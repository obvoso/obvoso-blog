import { getAllTagsWithCategory } from "@/services/notion"
import { CategoryTag, TagEnum } from "@/types/tags"
import { Box } from "@mui/material"
import React from "react"
import Tag from "./Tag"

export default async function MobileTagNavigation() {
  const data: CategoryTag[] = await getAllTagsWithCategory()

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "auto",
        gap: 1,
        padding: 4,
      }}
    >
      {data.map((category) => (
        <React.Fragment key={category.name}>
          <Tag tagName={category.name} type={TagEnum.CATEGORY} style="button" />
          {category.tags.map((tag) => (
            <Tag tagName={tag} type={TagEnum.TAG} style="button" />
          ))}
        </React.Fragment>
      ))}
    </Box>
  )
}
