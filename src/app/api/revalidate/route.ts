import { generateSlug } from "@/lib/utils/utils"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export async function PATCH(request: NextRequest) {
  const uuid = new Date().getTime()
  console.time(`❗️revalidate ${uuid}`)
  const { id, revalidateAuthKey, title } = (await request.json()) as {
    id: string
    revalidateAuthKey: string
    title: string
  }

  if (revalidateAuthKey === process.env.REVALIDATE_AUTH_KEY && id) {
    revalidateTag(id)
    revalidateTag("posts")
    console.time(`❗️preload ${uuid}`)
    try {
      await fetch(`http://localhost:3000/articles/${generateSlug(title)}`, {
        method: "GET",
      })
      console.timeEnd(`❗️preload ${uuid}`)
    } catch (error) {
      console.timeEnd(`❗️preload ${uuid}`)
      console.error(`Preload API call failed:`, error)
    }
    console.timeEnd(`❗️revalidate ${uuid}`)
    return Response.json({ revalidated: true, message: id, now: new Date() })
  }
  console.timeEnd(`❗️revalidate ${uuid}`)
  return Response.json({ revalidated: false, message: id, now: new Date() })
}
