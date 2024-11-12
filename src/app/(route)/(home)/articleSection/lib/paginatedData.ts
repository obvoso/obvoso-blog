import { getAllPost, getAllTagsWithCategory } from "@/lib/api/notion"
import { PaginationData } from "@/types/article"
import { NotionData } from "@/types/notion"

const itemsPerPage = 4

/**
 * id를 key로 가지는 postsById, categoryIndex, tagIndex를 반환합니다.
 */
export async function getPaginatedData() {
  const allPosts: NotionData[] = await getAllPost()

  const categoriesWithTags = await getAllTagsWithCategory()

  const postsById: { [id: string]: NotionData } = {}
  const categoryIndex: { [categoryName: string]: string[] } = {}
  const tagIndex: { [tagName: string]: string[] } = {}

  categoriesWithTags.forEach((category: any) => {
    categoryIndex[category.name] = []
    category.tags.forEach((tag: string) => {
      tagIndex[tag] = []
    })
  })

  allPosts.forEach((post) => {
    const postId = post.id
    postsById[postId] = post

    if (categoryIndex[post.category]) {
      categoryIndex[post.category].push(postId)
    }

    categoryIndex["전체보기"].push(postId)

    post.tag.forEach((tag) => {
      if (tagIndex[tag]) {
        tagIndex[tag].push(postId)
      }
    })
  })

  const paginatedData: PaginationData = {
    postsById,
    categoryIndex,
    tagIndex,
  }

  return paginatedData
}

export function getPostsByCategoryAndPage(
  category: string,
  pageNumber: number,
  paginatedData: PaginationData,
): NotionData[] {
  const postIds = paginatedData.categoryIndex[category] || []
  const startIndex = pageNumber * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pagePostIds = postIds.slice(startIndex, endIndex)
  return pagePostIds.map((id) => paginatedData.postsById[id])
}

export function getPostsByTagAndPage(
  tag: string,
  pageNumber: number,
  paginatedData: PaginationData,
): NotionData[] {
  const postIds = paginatedData.tagIndex[tag] || []
  const startIndex = pageNumber * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pagePostIds = postIds.slice(startIndex, endIndex)
  return pagePostIds.map((id) => paginatedData.postsById[id])
}
