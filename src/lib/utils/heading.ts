import { Heading } from "@/types/heading"
import { Element, Parent } from "hast"
import { isElement } from "hast-util-is-element"
import { Node } from "unist"
import { visit } from "unist-util-visit"
import { VFile } from "vfile"

/* eslint-disable @typescript-eslint/explicit-module-boundary-types, import/no-extraneous-dependencies, no-param-reassign */
export function rehypeSection() {
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

//<h2><a id="heading-1" href="#heading-1">Heading 1</a></h2>이 처리가 안되서 재귀적으로 텍스트를 추출하도록 수정
export function rehypeExtractHeadings() {
  return (tree: Node, file: VFile) => {
    const headings: Heading[] = []

    const extractText = (node: Node): string => {
      if (node.type === "text") {
        return (node as any).value as string
      }

      if ("children" in node && Array.isArray(node.children)) {
        return node.children.map(extractText).join("")
      }

      return ""
    }

    visit(tree, "element", (node: Element) => {
      if (["h1", "h2", "h3"].includes(node.tagName)) {
        const id = node.properties?.id as string
        const textContent = extractText(node)

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
