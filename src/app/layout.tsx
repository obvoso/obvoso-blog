import RecoilRootWrapper from "@/app/RecoilWrapper"
import { notoSansKr, notoSerifKr } from "@/styles/font"
import "@/styles/globals.css"
import "@/styles/themes.css"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import MobileHeader from "./(home)/profileSection/mobile/MobileHeader"
import Footer from "./components/layout/footer/Footer"

export const metadata: Metadata = {
  title: "obvoso blog",
  description: "hihi",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSansKr.className}, ${notoSerifKr.variable}`}>
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
