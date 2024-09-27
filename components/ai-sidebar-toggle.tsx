'use client'

import Image from 'next/image'
import ToggleOn from '@/app/assets/icons/toggle_on.svg'
import ToggleOff from '@/app/assets/icons/toggle_off.svg'
import { useAISidebar } from '@/lib/hooks/use-ai-sidebar'

const AISidebarToggle = () => {
  const { toggleAISidebar, isAISidebarOpen, isAILoading } = useAISidebar()
  return (
    <div className="flex items-center gap-4">
      <Image
        priority
        width={30}
        height={30}
        src={isAISidebarOpen ? ToggleOn : ToggleOff}
        alt={isAISidebarOpen ? 'toggle-on' : 'toggle-off'}
        className="mx-auto cursor-pointer"
        onClick={() => {
          toggleAISidebar()
        }}
      />
      <p>AI Guide</p>
    </div>
  )
}

export default AISidebarToggle
