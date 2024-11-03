import { getAllPost, getAllTagsWithCategory } from "@/lib/api/notion"
import { PaginationData } from "@/types/article"
import { NotionData } from "@/types/notion"
import { CategoryTag } from "@/types/tags"

const itemsPerPage = 4

/**
 * 게시물 데이터를 tag, category별로 페이지네이션하여 저장
 */
export default async function getPaginatedData() {
  const allPosts: NotionData[] = await getAllPost()
  const categoriesWithTags = await getAllTagsWithCategory()

  const paginatedData: PaginationData = {
    category: {},
    tag: {},
  }

  categoriesWithTags.forEach((category: CategoryTag) => {
    paginatedData.category[category.name] = []
    category.tags.forEach((tag) => {
      paginatedData.tag[tag] = []
    })
  })

  // 게시물 데이터 추가
  allPosts.forEach((post) => {
    const overallPages = paginatedData.category["전체보기"]
    const overallPageIndex = Math.floor(
      overallPages.flat().length / itemsPerPage,
    )
    if (!overallPages[overallPageIndex]) {
      overallPages[overallPageIndex] = []
    }
    overallPages[overallPageIndex].push(post)

    // 카테고리별 게시물 추가
    const categoryPages = paginatedData.category[post.category]
    if (categoryPages) {
      const categoryPageIndex = Math.floor(
        categoryPages.flat().length / itemsPerPage,
      )
      if (!categoryPages[categoryPageIndex]) {
        categoryPages[categoryPageIndex] = []
      }
      categoryPages[categoryPageIndex].push(post)
    }

    // 태그별 게시물 추가
    post.tag.forEach((tagName) => {
      const tagPages = paginatedData.tag[tagName]
      if (tagPages) {
        const tagPageIndex = Math.floor(tagPages.flat().length / itemsPerPage)
        if (!tagPages[tagPageIndex]) {
          tagPages[tagPageIndex] = []
        }
        tagPages[tagPageIndex].push(post)
      }
    })
  })

  return paginatedData
}
