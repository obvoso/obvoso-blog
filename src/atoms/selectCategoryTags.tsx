import { TagEnum, TagType } from "@/types/tags"
import { atom } from "recoil"

const selectTagsState = atom<TagType>({
  key: "selectTagsState",
  default: {
    tagName: "전체보기",
    type: TagEnum.CATEGORY,
  },
})

export default selectTagsState
