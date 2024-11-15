import GoogleAnalytics from "@/lib/utils/GoogleAnalytics"
import RecoilRootWrapper from "@/providers/RecoilWrapper"
import { notoSansKr } from "@/styles/font"
import "@/styles/globals.css"
import "@/styles/themes.css"
import { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import Footer from "./components/layout/footer/Footer"
import MobileHeader from "./components/layout/header/MobileHeader"

/**
 * @todo
 * og tag 추가(이미지, 설명, 제목..이미지 만들어야됨)
 */
export const metadata: Metadata = {
  title: {
    template: "%s | obvoso",
    default: "obvoso",
  },
  description: "기록장",
  icons: {
    icon: "/alien.ico",
  },
}

const gdID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSansKr.className}`}>
        <GoogleAnalytics gaId={gdID!} />
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
