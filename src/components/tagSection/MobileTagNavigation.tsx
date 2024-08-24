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
        overflowX: "auto",
      }}
    >
      {data.map((category) => (
        <React.Fragment key={category.name}>
          <Box sx={{ marginRight: 2 }}>
            <Tag tagName={category.name} type={TagEnum.CATEGORY} />
          </Box>
          {category.tags.map((tag) => (
            <Box key={tag} sx={{ marginRight: 2 }}>
              <Tag tagName={tag} type={TagEnum.TAG} />
            </Box>
          ))}
        </React.Fragment>
      ))}
    </Box>
  )
}
