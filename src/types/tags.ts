export const enum TagEnum {
  CATEGORY = "category",
  TAG = "tag",
}

export type CategoryTag = {
  name: string
  tags: string[]
}

export type TagType = {
  tagName: string
  type: TagEnum
}
