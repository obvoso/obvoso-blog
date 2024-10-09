"use client"

import CustomBox from "@/app/components/common/CustomBox"
import useScrollSpy from "@/hooks/useScrollSpy"

export function TableOfContents() {
  const { headings, activeIndexs } = useScrollSpy()

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
    <CustomBox
      sx={{
        position: "sticky",
        top: "10%",
        padding: 2,
        height: "fit-content",
      }}
    >
      <nav>
        <ul>
          {headings.map((heading, index) => (
            <li
              key={index}
              style={{ marginLeft: `${(heading.level - 1) * 20}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={activeIndexs.includes(index) ? "active" : ""}
                onClick={(e) => handleScroll(e, heading.id)}
              >
                {heading.textContent}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </CustomBox>
  )
}
