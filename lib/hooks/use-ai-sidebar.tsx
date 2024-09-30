'use client'

import * as React from 'react'

const LOCAL_STORAGE_KEY = 'ai-sidebar'

interface AISidebarContext {
  isAISidebarOpen: boolean
  toggleAISidebar: () => void
  isAILoading: boolean
}

const AISidebarContext = React.createContext<AISidebarContext | undefined>(
  undefined
)

export function useAISidebar() {
  const context = React.useContext(AISidebarContext)
  if (!context) {
    throw new Error('useAISidebarContext must be used within a AISidebarProvider')
  }
  return context
}

interface AISidebarProviderProps {
  children: React.ReactNode
}

export function AISidebarProvider({ children }: AISidebarProviderProps) {
  const [isAISidebarOpen, setAISidebarOpen] = React.useState(true)
  const [isAILoading, setAILoading] = React.useState(true)

  React.useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value) {
      setAISidebarOpen(JSON.parse(value))
    }
    setAILoading(false)
  }, [])

  const toggleAISidebar = () => {
    setAISidebarOpen(value => {
      const newState = !value
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
      return newState
    })
  }

  if (isAILoading) {
    return null
  }

  return (
    <AISidebarContext.Provider
      value={{ isAISidebarOpen, toggleAISidebar, isAILoading }}
    >
      {children}
    </AISidebarContext.Provider>
  )
}
