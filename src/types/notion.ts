export type NotionBlock = {
  type: string
  blockId: string
  parent: string
  children: NotionBlock[]
}
