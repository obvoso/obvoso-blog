import { NextResponse } from "next/server"

export async function GET() {
  const pageUrl = "https://www.obvoso.site"

  try {
    console.log(`Preloading page`)
    const response = await fetch(pageUrl, { method: "GET", cache: "no-cache" })
    console.log(`Fetch response status: ${response.status}`)
    return NextResponse.json({ success: true, status: response.status })
  } catch (error) {
    console.error("Preload failed:", error)
    return NextResponse.json({ success: false, error })
  }
}
