import { getAllTagsWithCategory } from "@/services/notion"
import { CategoryTag } from "@/types/tags"
import Sidebar from "./SideBar"

export default async function DesktopTagNavigation() {
  const data: CategoryTag[] = await getAllTagsWithCategory()

  return <Sidebar data={data} />
}
