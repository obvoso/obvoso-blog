import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export async function PATCH(request: NextRequest) {
  const { id, revalidateAuthKey, title } = (await request.json()) as {
    id: string
    revalidateAuthKey: string
    title: string
  }

  if (revalidateAuthKey === process.env.REVALIDATE_AUTH_KEY && id) {
    revalidateTag(id)
    revalidateTag("posts")
    revalidatePath("/", "page")

    try {
      await fetch(
        `https://www.obvoso.site/api/preload?slug=${encodeURIComponent(title)}`,
        {
          method: "GET",
        },
      )
    } catch (error) {
      console.error(`Preload API call failed:`, error)
    }

    return Response.json({ revalidated: true, message: id, now: new Date() })
  }
  return Response.json({ revalidated: false, message: id, now: new Date() })
}
