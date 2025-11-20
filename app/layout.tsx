import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { NavbarWrapper } from "@/app/components/navbar-wrapper"
import { ScrollToTop } from "@/app/utils/scroll-to-top"
import { ChatbotThemeProvider } from "@/app/contexts/chatbot-theme-context"
import type React from "react"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bot247.live",
  description: "AI-powered admission support system",
  generator: "v0.dev",
  icons: {
    icon: "/images/default-avatar.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Script
          src="https://chat.bot247.live/api/chatbot-script"
          data-chatbot-id="bot247chatbot"
          strategy="afterInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <ChatbotThemeProvider>
            <div className="flex flex-col min-h-screen">
              <NavbarWrapper />
              <main className="flex-grow">{children}</main>
            </div>
            <ScrollToTop />
          </ChatbotThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
