import GoogleAnalytics from "@/lib/utils/GoogleAnalytics"
import RecoilRootWrapper from "@/providers/RecoilWrapper"
import { notoSansKr } from "@/styles/font"
import "@/styles/globals.css"
import "@/styles/themes.css"
import { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import Footer from "./components/layout/footer/Footer"
import MobileHeader from "./components/layout/header/MobileHeader"

export const metadata: Metadata = {
  title: {
    template: "%s | obvoso",
    default: "obvoso",
  },
  description: "기록장",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: "obvoso",
    description: "기록장",
    type: "website",
    url: `https://www.obvoso.site/`,
    images: [
      {
        url: "/ocean.jpeg",
        alt: "obvoso",
        width: 1200,
        height: 630,
      },
    ],
  },
}

const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSansKr.className}`}>
        <GoogleAnalytics gaId={gaId!} />
        <ThemeProvider attribute="class" defaultTheme="system">
          <RecoilRootWrapper>
            <header>
              <MobileHeader />
            </header>
            <main>
              <div className="main-container">{children}</div>
            </main>
            <footer>
              <Footer />
            </footer>
          </RecoilRootWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
