import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { pageId } = await request.json()

  revalidateTag([pageId])

  return Response.json({ revalidated: true })
}
