'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AISidebarProvider } from '@/lib/hooks/use-ai-sidebar'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SidebarProvider>
        <AISidebarProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AISidebarProvider>
      </SidebarProvider>
    </NextThemesProvider>
  )
}
