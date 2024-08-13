import { getAllTagsWithCategory } from "@/services/notion"
import { CategoryTag, TagEnum } from "@/types/tags"
import { Box } from "@mui/material"
import Tag from "./Tag"

export default async function TagNavigation() {
  const data: CategoryTag[] = await getAllTagsWithCategory()

  return (
    <Box
      padding={4}
      sx={{
        display: "flex",
        alignItems: "start",
        flexDirection: { xs: "row", sm: "column" },
        overflowX: { xs: "auto", sm: "visible" },
        gap: 2,
      }}
    >
      {data.map((category) => (
        <div key={category.name}>
          <Tag tagName={category.name} type={TagEnum.CATEGORY} />
          {category.tags.map((tag, idx) => (
            <Tag key={tag} tagName={tag} type={TagEnum.TAG} />
          ))}
        </div>
      ))}
    </Box>
  )
}
