import { useEffect, useRef, useState } from "react"

type Heading = {
  id: string
  textContent: string | null
  level: number
}

const useScrollSpy = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeIndexs, setActiveIndexs] = useState<Number[]>([])
  const ElementRef = useRef<Element[]>([])

  /**
   * @description
   * Get all headings
   */
  useEffect(() => {
    // h1, h2, h3 객체 다가져옴
    const headingElements = Array.from(document.querySelectorAll("h1, h2, h3"))
    // UI에 표시할 데이터로 변환
    const mappedHeadings = headingElements.map((heading) => ({
      id: heading.id,
      textContent: heading.textContent,
      level: parseInt(heading.tagName[1], 10),
    }))

    setHeadings(mappedHeadings)
    ElementRef.current = headingElements
  }, [])

  /**
   * @description
   * 뷰포트에 들어온 엘리먼트들을 activeIndexs에 추가
   **/
  function addIntersectingEntries(entries: IntersectionObserverEntry[]) {
    const intersectingEntries = entries.filter((entry) => entry.isIntersecting)

    if (intersectingEntries.length) {
      setActiveIndexs((prev) => [
        ...prev,
        ...intersectingEntries.map((entry) =>
          ElementRef.current.indexOf(entry.target),
        ),
      ])
    }
  }

  /**
   * @description
   * 뷰포트에 나간 엘리먼트들을 activeIndexs에서 제거
   * */
  function removeUnintersectingEntries(entries: IntersectionObserverEntry[]) {
    const unIntersectingEntries = entries.filter(
      (entry) => !entry.isIntersecting,
    )

    if (unIntersectingEntries.length) {
      setActiveIndexs((prev) =>
        prev.filter(
          (index) =>
            !unIntersectingEntries.some(
              (entry) => ElementRef.current.indexOf(entry.target) === index,
            ),
        ),
      )
    }
  }

  /**
   * @param entries
   * @description intersectionObserver의 콜백함수
   */
  function handleIntersectionHeader(entries: IntersectionObserverEntry[]) {
    addIntersectingEntries(entries)
    removeUnintersectingEntries(entries)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      handleIntersectionHeader(entries)
    })

    ElementRef.current.forEach((heading) => observer.observe(heading))

    return () => {
      ElementRef.current.forEach((heading) => observer.unobserve(heading))
    }
  }, [headings])

  return {
    headings,
    activeIndexs,
  }
}

export default useScrollSpy
