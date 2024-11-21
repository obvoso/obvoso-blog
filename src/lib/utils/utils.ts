export function generateSlug(title: string) {
  return encodeURIComponent(title.toLowerCase().replace(/ /g, "-"))
}

export function onClickGithub() {
  window.open("https://github.com/obvoso", "_blank")
}
