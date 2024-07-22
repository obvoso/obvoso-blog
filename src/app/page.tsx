import { getAll } from "@/services/notion"
import { Post } from "./articles/[id]/page"
import styles from "./page.module.css"

export default async function Home() {
  const data = await getAll()

  return (
    <main className={styles.main}>
      <Post id={data.results[0].id} />
    </main>
  )
}
