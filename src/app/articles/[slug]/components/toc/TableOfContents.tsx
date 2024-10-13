"use client"

import CustomBox from "@/app/components/common/CustomBox"
import StarTextBox from "@/app/components/common/StarTextBox"
import useScrollSpy from "@/hooks/useScrollSpy"
import { Heading } from "@/types/heading"
import "./TableOfContents.css"

type TableOfContentsProps = {
  initialHeadings: Heading[]
}

export function TableOfContents({ initialHeadings }: TableOfContentsProps) {
  const { headings, activeIndexs } = useScrollSpy(initialHeadings)

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault()
    const targetElement = document.getElementById(id)

    if (targetElement) {
      const headerOffset = 50
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      window.history.replaceState(null, "", `#${id}`)
    }
  }

  return (
    <aside className="aside-container">
      <CustomBox
        sx={{
          background: "var(--background)",
          position: "sticky",
          top: "10%",
          height: "fit-content",
          width: {
            xs: "100%",
            lg: "200px",
          },
          padding: 0,
          color: "var(--text-tertiatry)",
        }}
      >
        <StarTextBox text="목차"></StarTextBox>
        <nav>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
            }}
          >
            {headings.map((heading, index) => (
              <li
                key={index}
                style={{
                  paddingLeft: `${(heading.level - 1) * 20}px`,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className={activeIndexs.includes(index) ? "active" : ""}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleScroll(e, heading.id)}
                >
                  {heading.textContent}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </CustomBox>
    </aside>
  )
}
