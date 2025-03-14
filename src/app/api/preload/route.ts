import { NextRequest, NextResponse } from "next/server"
import { generateSlug } from "@/lib/utils/utils"

export async function GET(request: NextRequest) {
  const pageUrl = "https://www.obvoso.site"
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const encodedSlug = generateSlug(slug ?? "")

  try {
    console.log(`Preloading page`)
    console.log(`Page URL: ${slug}`)
    console.log(`Encoded URL: ${encodedSlug}`)

    const [rootResponse, pageResponse] = await Promise.all([
      fetch(pageUrl, { method: "GET", cache: "no-cache" }),
      fetch(`${pageUrl}/articles/${encodedSlug}`, {
        method: "GET",
        cache: "no-cache",
      }),
    ])

    console.log(`Fetch root response status: ${rootResponse.status}`)
    console.log(`Fetch page response status: ${pageResponse.status}`)

    return NextResponse.json({
      success: true,
      rootStatus: rootResponse.status,
      pageStatus: pageResponse.status,
    })
  } catch (error) {
    console.error("Preload failed:", error)
    return NextResponse.json({ success: false, error })
  }
}
