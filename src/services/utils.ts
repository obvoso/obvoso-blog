export function generateSlug(title: string) {
  return encodeURIComponent(title.toLowerCase().replace(/ /g, "-"))
}

export function parseDate(date: string) {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
