"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"
import "./comments.styles.css"

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  const theme = resolvedTheme === "dark" ? "dark" : "light"

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

    if (!repo || !repoId || !categoryId) {
      return
    }

    const scriptElememt = document.createElement("script")
    scriptElememt.src = "https://giscus.app/client.js"
    scriptElememt.async = true
    scriptElememt.crossOrigin = "anonymous"
    scriptElememt.setAttribute("data-repo", repo)
    scriptElememt.setAttribute("data-repo-id", repoId)
    scriptElememt.setAttribute("data-category", "Comments")
    scriptElememt.setAttribute("data-category-id", categoryId)
    scriptElememt.setAttribute("data-mapping", "pathname")
    scriptElememt.setAttribute("data-strict", "0")
    scriptElememt.setAttribute("data-reactions-enabled", "1")
    scriptElememt.setAttribute("data-emit-metadata", "0")
    scriptElememt.setAttribute("data-input-position", "top")
    scriptElememt.setAttribute("data-theme", theme)
    scriptElememt.setAttribute("data-lang", "ko")
    scriptElememt.setAttribute("data-loading", "lazy")
    ref.current.appendChild(scriptElememt)
  }, [])

  useEffect(() => {
    const giscusLoaded = () => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        "iframe.giscus-frame",
      )
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app",
      )
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://giscus.app") return

      if (event.data?.giscus?.discussion) {
        giscusLoaded()
      }
    }

    giscusLoaded()
    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [theme])

  return <section ref={ref} />
}
