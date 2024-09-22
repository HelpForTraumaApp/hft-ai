import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { SidebarDesktop } from '@/components/sidebar-desktop'
import { nanoid } from '@/lib/utils'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { AI } from '@/lib/chat/actions'
import { ContentPanel } from '@/components/content-panel'
import Template from './template'
export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: {
    default: 'Help for Trauma',
    template: `%s - Next.js AI Chatbot`
  },
  description: 'Heal from trauma with the ITR Method & AI.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col flex-1 bg-muted/50">
              {session ? (
                <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
                  <SidebarDesktop />
                  <div className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
                    <div className="flex h-full w-full">
                      <div className="relative w-2/3 overflow-y-auto">
                        <Template>{children}</Template>
                      </div>
                      <div className="w-1/3 flex items-end border-l border-gray-200 dark:border-gray-700">
                        <AI initialAIState={{ chatId: id, messages: [] }}>
                          <ContentPanel
                            id={id}
                            session={session}
                            missingKeys={missingKeys}
                          />
                        </AI>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                children
              )}
            </main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
