import { getAllTagsWithCategory } from "@/lib/api/notion"
import { CategoryTag } from "@/types/tags"
import SelectCategory from "./SelectCategory"

export default async function DesktopTagNavigation() {
  const data: CategoryTag[] = await getAllTagsWithCategory()

  return <SelectCategory data={data} />
}
