import { getAllCategory } from "@/services/tags"
import { Button } from "@mui/material"

export default async function TagVerticalNavigation() {
  const data = await getAllCategory()

  return (
    <div>
      {data.map((category: any) => {
        return (
          <div key={category.category}>
            <h1>{category.category}</h1>
            <ul>
              {category.tags.map((tag: any) => {
                return (
                  <li key={tag.tag}>
                    <Button onClick={()}>{tag.tag}</Button>
                    <span>({tag.count})</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
