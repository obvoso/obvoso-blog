import RecoilRootWrapper from "@/app/RecoilWrapper"
import Header from "@/components/layout/Header"
import { inter, notoSerifKr } from "@/styles/font"
import "@/styles/globals.css"
import "@/styles/themes.css"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"

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
      <body className={`${inter.className}, ${notoSerifKr.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <RecoilRootWrapper>
            <main>{children}</main>
          </RecoilRootWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
