import { getAllTagsWithCategory } from "@/services/notion"
import { CategoryTag, TagEnum } from "@/types/tags"
import { Divider, List } from "@mui/material"
import Tag from "./Tag"

export default async function TagNavigation() {
  const data: CategoryTag[] = await getAllTagsWithCategory()
  return (
    <List
      sx={{
        padding: 4,
        display: { xs: "none", sm: "flex" },
        alignItems: "start",
        flexDirection: "column",
      }}
    >
      {data.map((category) => (
        <div key={category.name}>
          <Divider
            sx={{
              bgcolor: "var(--text)",
            }}
          />
          <Tag tagName={category.name} type={TagEnum.CATEGORY} />
          {category.name !== "전체보기" && (
            <Divider
              sx={{
                bgcolor: "var(--text)",
              }}
            />
          )}
          {category.tags.map((tag, idx) => (
            <Tag key={tag} tagName={tag} type={TagEnum.TAG} />
          ))}
        </div>
      ))}
    </List>
  )
}
