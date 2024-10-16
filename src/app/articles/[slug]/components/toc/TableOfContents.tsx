"use client"

import CustomTypography from "@/app/components/common/CustomTypography"
import useScrollSpy from "@/hooks/useScrollSpy"
import { Heading } from "@/types/heading"
import { Box, useTheme } from "@mui/material"
import "./TableOfContents.css"

type TableOfContentsProps = {
  initialHeadings: Heading[]
}

export function TableOfContents({ initialHeadings }: TableOfContentsProps) {
  if (!initialHeadings) {
    return null
  }
  const { activeIndexs } = useScrollSpy(initialHeadings)
  const theme = useTheme()
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
      <Box
        sx={{
          position: "sticky",
          top: "10%",
          height: "fit-content",
          width: {
            xs: "100%",
          },
          color: "var(--text-tertiatry)",
          [theme.breakpoints.up(1320)]: {
            width: "200px",
          },
        }}
      >
        <CustomTypography color="var(--text-tertiatry)">목차</CustomTypography>
        <hr className="toc-hr" />
        <nav>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
            }}
          >
            {initialHeadings.map((heading, index) => (
              <li
                key={index}
                style={{
                  paddingLeft: `${(heading.level - 1) * 10}px`,
                }}
                className={`heading-list ${
                  activeIndexs.includes(index) ? "active" : ""
                }`}
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
      </Box>
    </aside>
  )
}
