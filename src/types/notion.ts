export type NotionData = {
  index: number
  id: string
  title: string
  description: string
  hotAtcicle: boolean
  createdTime: string
  slug: string
  category: string
  tag: string[]
  thumbnail: string
  blurThumbnail: string
  prevIndex: number | null
  nextIndex: number | null
}
