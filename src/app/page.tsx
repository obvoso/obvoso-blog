import { getAll } from "@/services/notion"
import styles from "./page.module.css"

export default async function Home() {
  const data = await getAll()
  console.log(data)

  return (
    <main className={styles.main}>
      <ul>
        {data.map((page: any) => {
          return (
            <li key={page.id}>
              <a href={`/articles/${page.slug}`}>{page.title}</a>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
