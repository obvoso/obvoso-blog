export type NotionBlock = {
  object: string
  id: string
  has_children: boolean
  type: string
  [key: string]: any
}

export type NotionBlockChildList = {
  object: string
  results: NotionBlock[]
  next_cursor: string | null
  has_more: boolean
}

type ImageFile = {
  type: "file"
  file: {
    url: string
    expiry_time: string
  }
}

type ImageExternal = {
  type: "external"
  external: {
    url: string
  }
}

export type NotionImageBlock = {
  id: string
  image: ImageFile | ImageExternal
}
