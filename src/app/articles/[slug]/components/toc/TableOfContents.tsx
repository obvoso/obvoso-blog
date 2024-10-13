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
  const { headings, activeIndexs } = useScrollSpy(initialHeadings)
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
        <hr
          style={{
            border: "0.1px solid var(--border)",
            margin: "0.5rem 0 1rem 0",
          }}
        />
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
                  style={{
                    fontSize: "0.8rem",
                  }}
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
