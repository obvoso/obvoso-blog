import RecoilRootWrapper from "@/app/RecoilWrapper"
import { notoSansKr } from "@/styles/font"
import "@/styles/globals.css"
import "@/styles/themes.css"
import { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import MobileHeader from "./(home)/profileSection/mobile/MobileHeader"
import Footer from "./components/layout/footer/Footer"

/**
 * @todo
 * og tag 추가(이미지, 설명, 제목..이미지 만들어야됨)
 */
export const metadata: Metadata = {
  title: {
    template: "%s | tetote105",
    default: "tetote105",
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSansKr.className}`}>
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
