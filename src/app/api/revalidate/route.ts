import { getAllPost } from "@/lib/api/notion"
import { generateSlug } from "@/lib/utils/utils"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export async function PATCH(request: NextRequest) {
  console.time("revalidate start")
  const { id, revalidateAuthKey, title } = (await request.json()) as {
    id: string
    revalidateAuthKey: string
    title: string
  }
  const slug = generateSlug(title)

  if (revalidateAuthKey === process.env.REVALIDATE_AUTH_KEY && id) {
    console.time("revalidate id")
    revalidateTag(id)
    console.timeEnd("revalidate id")
    console.time("revalidate posts")
    revalidateTag("posts")
    console.timeEnd("revalidate posts")
    console.time("revalidate path root")
    revalidatePath("/", "page")
    console.timeEnd("revalidate path root")
    console.time("revalidate path articles")
    revalidatePath(`/articles/${slug}`, "page")
    console.timeEnd("revalidate path articles")

    console.time("fetch all posts after revalidate")
    await getAllPost()
    console.timeEnd("fetch all posts after revalidate")
    console.timeEnd("revalidate start")
    return Response.json({ revalidated: true, message: id, now: new Date() })
  }
  console.timeEnd("revalidate start")
  return Response.json({ revalidated: false, message: id, now: new Date() })
}
