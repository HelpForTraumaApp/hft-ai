'use client'

import { useState } from 'react'
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
      <div className="p-7">
        <Image
          src="/logo.png"
          alt="Description of the image"
          width={500}
          height={300}
          priority
        />
      </div>

      <ul>
        <li 
          className={`px-6 py-5 ${selectedItem === 'Dashboard' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          onClick={() => setSelectedItem('Dashboard')}
        >
          Dashboard
        </li>
        <li 
          className={`px-7 py-5 ${selectedItem === 'Grounding' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          onClick={() => setSelectedItem('Grounding')}
        >
          Grounding
        </li>
        <li 
          className={`px-7 py-5 ${selectedItem === 'Safe Place' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          onClick={() => setSelectedItem('Safe Place')}
        >
          Safe Place
        </li>
        <li 
          className={`px-7 py-5 ${selectedItem === 'Parts Map' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          onClick={() => setSelectedItem('Parts Map')}
        >
          True Self & Parts Map
        </li>
        <li 
          className={`px-7 py-5 ${selectedItem === 'Externalized Dialogue' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          onClick={() => setSelectedItem('Externalized Dialogue')}
        >
          Externalized Dialogue
        </li>
        <li 
          className={`px-7 py-5 ${selectedItem === 'Stories' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          onClick={() => setSelectedItem('Stories')}
        >
          Stories
        </li>
      </ul>
    </nav>
  )
}
