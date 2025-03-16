import { getAllPost } from "@/lib/api/notion"
import { generateSlug } from "@/lib/utils/utils"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export async function PATCH(request: NextRequest) {
  console.time("❗️revalidate")
  const { id, revalidateAuthKey, title } = (await request.json()) as {
    id: string
    revalidateAuthKey: string
    title: string
  }
  const slug = generateSlug(title)

  if (revalidateAuthKey === process.env.REVALIDATE_AUTH_KEY && id) {
    revalidateTag(id)
    revalidateTag("posts")

    await getAllPost()
    console.timeEnd("❗️revalidate")
    return Response.json({ revalidated: true, message: id, now: new Date() })
  }
  console.timeEnd("❗️revalidate")
  return Response.json({ revalidated: false, message: id, now: new Date() })
}
