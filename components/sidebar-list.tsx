'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SidebarList() {
  const pathname = usePathname()

  return (
    <nav>
      <div className="flex items-center flex-between p-7">
        <div>
          <img src="/logo.png" width="80" />
        </div>
        <div className="ml-3 text-2xl font-semibold">
          <div>Help for</div>
          <div>Trauma</div>
        </div>
      </div>

      <div>
        <Link href="/dashboard">
          <div
            className={`px-6 py-5 ${pathname === '/dashboard' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          >
            Dashboard
          </div>
        </Link>

        <Link href="/grounding">
          <div
            className={`px-7 py-5 ${pathname === '/grounding' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          >
            Grounding
          </div>
        </Link>
        <Link href="/safe-place">
          <div
            className={`px-7 py-5 ${pathname === '/safe-place' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          >
            Safe Place
          </div>
        </Link>
        <Link href="/trueself">
          <div
            className={`px-7 py-5 ${pathname === '/parts-map' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          >
            Parts Map
          </div>
        </Link>
        <Link href="/externalized">
          <div
            className={`px-7 py-5 ${pathname === '/dialogue' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          >
            Dialogue
          </div>
        </Link>
        <Link href="/stories">
          <div
            className={`px-7 py-5 ${pathname === '/stories' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          >
            Stories
          </div>
        </Link>
      </div>
    </nav>
  )
}
