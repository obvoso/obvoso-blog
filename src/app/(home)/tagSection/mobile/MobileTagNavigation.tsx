import { getAllTagsWithCategory } from "@/lib/api/notion"
import { CategoryTag } from "@/types/tags"

import MobileTags from "./MobileTags"

export default async function MobileTagNavigation() {
  const data: CategoryTag[] = await getAllTagsWithCategory()

  return <MobileTags tags={data} />
}
