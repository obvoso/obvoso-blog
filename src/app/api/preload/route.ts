import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const pageUrl = "https://www.obvoso.site"
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const encodedSlug = slug
    ? encodeURIComponent(slug.toLowerCase().replace(/ /g, "-"))
    : ""

  try {
    console.log(`Preloading page`)
    console.log(`Page URL: ${slug}`)
    console.log(`Encoded URL: ${encodedSlug}`)
    const rootResponse = await fetch(pageUrl, {
      method: "GET",
      cache: "no-cache",
    })
    const pageResponse = await fetch(`${pageUrl}/articles/${encodedSlug}`, {
      method: "GET",
      cache: "no-cache",
    })
    console.log(`Fetch root response status: ${rootResponse.status}`)
    console.log(`Fetch page response status: ${pageResponse.status}`)
    return NextResponse.json({
      success: true,
      status: rootResponse.status && pageResponse.status,
    })
  } catch (error) {
    console.error("Preload failed:", error)
    return NextResponse.json({ success: false, error })
  }
}
