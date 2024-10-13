import { Heading } from "@/types/heading"
import { useEffect, useRef, useState } from "react"

const useScrollSpy = (initialHeadings: Heading[]) => {
  const [headings, setHeadings] = useState<Heading[]>(initialHeadings)
  const [activeIndexs, setActiveIndexs] = useState<Number[]>([])
  const ElementRef = useRef<Element[]>([])

  /**
   * @description
   * Get all headings
   */
  useEffect(() => {
    // initialHeadings와 매칭되는 DOM 요소를 찾음
    const headingElements = initialHeadings.map(
      (heading) => document.getElementById(heading.id) as Element,
    )

    // DOM 요소를 참조하고 상태 업데이트
    ElementRef.current = headingElements.filter((el) => el !== null)
  }, [initialHeadings])

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