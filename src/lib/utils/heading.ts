import { Heading } from "@/types/heading"
import { Node } from "unist"
import { visit } from "unist-util-visit"
import { VFile } from "vfile"

interface ElementNode extends Node {
  tagName?: string
  properties?: {
    id?: string
  }
  children: Array<Node & { value?: string }>
}

export function extractHeadings() {
  return (tree: Node, file: VFile) => {
    const headings: Heading[] = []

    visit(tree, "element", (node: ElementNode) => {
      if (["h1", "h2", "h3"].includes(node.tagName!)) {
        const id = node.properties?.id
        const textContent = node.children
          .filter((child) => child.type === "text" && child.value)
          .map((child) => child.value)
          .join("")

        if (id && textContent) {
          headings.push({
            id,
            textContent,
            level: parseInt(node.tagName![1], 10),
          })
        }
      }
    })

    file.data.headings = headings
  }
}
