export function generateSlug(title: string) {
  return encodeURIComponent(title.toLowerCase().replace(/ /g, "-"))
}
