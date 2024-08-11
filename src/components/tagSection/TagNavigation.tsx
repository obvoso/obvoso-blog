import { getAllTagsWithCategory } from "@/services/notion"
import { CategoryTag, TagEnum } from "@/types/tags"
import Tag from "./Tag"

export default async function TagNavigation() {
  const data: CategoryTag[] = await getAllTagsWithCategory()

  return (
    <div>
      {data.map((category) => (
        <div key={category.name}>
          <Tag tagName={category.name} type={TagEnum.CATEGORY} />
          {category.tags.map((tag, idx) => (
            <Tag key={idx} tagName={tag} type={TagEnum.TAG} />
          ))}
        </div>
      ))}
    </div>
  )
}
