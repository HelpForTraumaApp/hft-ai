'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from 'react-icons/md'

export function SidebarList() {
  const [isOpenPartsMenu, setOpenPartsMenu] = useState(false)
  const [isOpenResMenu, setOpenResMenu] = useState(false)
  const [selectedItem, setSelectedItem] = useState('Dashboard')

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
            className={`px-6 py-5 ${selectedItem === 'Dashboard' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
            onClick={() => setSelectedItem('Dashboard')}
          >
            Dashboard
          </div>
        </Link>

        <Link href="/grounding">
          {' '}
          <div
            className={`px-7 py-5 ${selectedItem === 'Grounding' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
            onClick={() => setSelectedItem('Grounding')}
          >
            Grounding
          </div>
        </Link>
        <Link href="/safe_place">
          <div
            className={`px-7 py-5 ${selectedItem === 'Safe Place' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
            onClick={() => setSelectedItem('Safe Place')}
          >
            Safe Place
          </div>
        </Link>
        <Link href="/trueself">
          <div
            className={`px-7 py-5 ${selectedItem === 'Parts Map' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
            onClick={() => setSelectedItem('Parts Map')}
          >
            {' '}
            True Self & Parts Map
          </div>
        </Link>
        <Link href="/externalized">
          <div
            className={`px-7 py-5 ${selectedItem === 'Externalized Dialogue' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
            onClick={() => setSelectedItem('Externalized Dialogue')}
          >
            Externalized Dialogue
          </div>
        </Link>
        <Link href="/stories">
          <div
            className={`px-7 py-5 ${selectedItem === 'Stories' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
            onClick={() => setSelectedItem('Stories')}
          >
            Stories
          </div>
        </Link>
      </div>
    </nav>
  )
}
