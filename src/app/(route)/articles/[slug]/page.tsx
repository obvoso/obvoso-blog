import CustomBox from "@/app/components/common/CustomBox"
import { getSlugPage } from "@/lib/api/article"
import { getAllPost } from "@/lib/api/notion"
import { NotionData } from "@/types/notion"
import Box from "@mui/material/Box"
import "highlight.js/styles/hybrid.css"
import { Metadata } from "next"
import ArticleContent from "./components/ArticleContent"
import ArticleHeader from "./components/ArticleHeader"
import Comments from "./components/comments/Comments"
import ArticleFooterNavigation from "./components/footerNavigation/ArticleFooterNavigation"

type ArticleProps = {
  params: {
    slug: string
  }
}

export default async function Article({ params }: ArticleProps) {
  return (
    <article>
      <CustomBox
        sx={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          paddingY: { xs: 4, md: 10 },
          paddingX: { xs: "1rem", sm: "2rem" },
          borderRadius: "0px 0px 32px 32px",
          border: "none",
          background: "var(--background)",
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <ArticleHeader slug={params.slug} />
          <ArticleContent slug={params.slug} />
          <ArticleFooterNavigation slug={params.slug} />
          <Comments />
        </Box>
      </CustomBox>
    </article>
  )
}

export async function generateStaticParams() {
  const data: NotionData[] = await getAllPost()
  return data.map((page: NotionData) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({
  params,
}: ArticleProps): Promise<Metadata> {
  const post = await getSlugPage(params.slug)

  const metadata: Metadata = {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      type: "website",
      url: `https://www.obvoso.site/articles/${params.slug}`,
      images: [
        {
          url: post?.thumbnail!,
          alt: post?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.description,
      images: [`https://www.obvoso.site/articles/${params.slug}`],
    },
  }
  return metadata
}
