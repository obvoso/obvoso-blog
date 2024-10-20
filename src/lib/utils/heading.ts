import { Heading } from "@/types/heading"
import { Element, Parent } from "hast"
import { isElement } from "hast-util-is-element"
import { Node } from "unist"
import { visit } from "unist-util-visit"
import { VFile } from "vfile"

export const rehypeSection = () => {
  return (tree: Parent) => {
    const newChildren: Element[] = []
    let currentSection: Element | null = null

    tree.children.forEach((node: Node) => {
      if (
        isElement(node, "h1") ||
        isElement(node, "h2") ||
        isElement(node, "h3")
      ) {
        if (currentSection) {
          newChildren.push(currentSection)
        }

        currentSection = {
          type: "element",
          tagName: "section",
          properties: { id: node.properties?.id },
          children: [node],
        }
      } else if (currentSection) {
        currentSection.children.push(node as Element)
      } else {
        newChildren.push(node as Element)
      }
    })

    if (currentSection) {
      newChildren.push(currentSection)
    }

    tree.children = newChildren
  }
}

export const rehypeExtractHeadings = () => {
  return (tree: Node, file: VFile) => {
    const headings: Heading[] = []

    visit(tree, "element", (node: Element) => {
      if (["h1", "h2", "h3"].includes(node.tagName)) {
        const id = node.properties?.id as string
        const textContent = node.children
          .filter((child) => child.type === "text")
          .map((child: any) => child.value)
          .join("")

        headings.push({
          id,
          textContent,
          level: parseInt(node.tagName.replace("h", ""), 10),
        })
      }
    })

    file.data = { headings }
  }
}
