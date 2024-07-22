import { getAll, getNotionData } from "@/services/notion"
import styles from "./page.module.css"

async function Post({ id }: { id: string }) {
  const post = await getNotionData(id)
  console.log(post)
  return <div>aa</div>
}

export default async function Home() {
  const data = await getAll()
  console.log(data)

  return (
    <main className={styles.main}>
      <Post id={data.results[0].id} />
    </main>
  )
}
