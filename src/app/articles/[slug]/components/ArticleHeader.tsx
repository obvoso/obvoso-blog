import BlurImage from "@/components/common/BlurImage"
import CustomTypography from "@/components/common/CustomTypography"
import { getArticleHeader } from "@/services/article"
import { Box } from "@mui/material"

type ArticleHeaderProps = {
  slug: string
}

function ArticleHeaderTag({ tag }: { tag: string }) {
  return (
    <Box
      sx={{
        paddingY: 0.5,
        paddingX: 1.5,
        backgroundColor: "var(--background-secondary)",
        color: "var(--tertiary)",
        borderRadius: 4,
        display: "inline-block",
      }}
    >
      {tag}
    </Box>
  )
}

export default async function ArticleHeader({ slug }: ArticleHeaderProps) {
  const {
    title,
    description,
    createdTime,
    category,
    tag,
    thumbnail,
    blurThumbnail,
  } = await getArticleHeader(slug)
  return (
    <Box
      sx={{
        paddingY: 5,
      }}
    >
      <CustomTypography weight={900} size={32}>
        {title}
      </CustomTypography>
      <CustomTypography size={18} weight={500} color="var(--tertiary)">
        {description}
      </CustomTypography>
      <Box sx={{ display: "flex", gap: 1, paddingY: 3 }}>
        <ArticleHeaderTag tag={category} />
        {tag.map((t: string) => (
          <ArticleHeaderTag key={t} tag={t} />
        ))}
      </Box>
      <CustomTypography size={14} color="gray" sx={{ paddingBottom: 2 }}>
        {createdTime}
      </CustomTypography>
      <BlurImage src={thumbnail} blurDataURL={blurThumbnail} />
    </Box>
  )
}
