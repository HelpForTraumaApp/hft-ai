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
          className={`px-7 py-5 ${selectedItem === 'Safe Place' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
          onClick={() => setSelectedItem('Safe Place')}
        >
          Safe Place
        </li>
        <li>
          <div 
            className={`w-full px-5 py-5 ${selectedItem === 'Parts' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
            onClick={() => setSelectedItem('Parts')}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenPartsMenu(!isOpenPartsMenu);
              }}
              className="w-full flex justify-between items-center"
            >
              Parts{' '}
              {isOpenPartsMenu === true ? (
                <MdOutlineKeyboardArrowUp className="text-lg" />
              ) : (
                <MdOutlineKeyboardArrowDown className="text-lg" />
              )}
            </button>
          </div>

          <ul className={`${isOpenPartsMenu === true ? '' : 'hidden'}`}>
            <li 
              className={`px-10 py-5 ${selectedItem === 'Parts Map' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
              onClick={() => setSelectedItem('Parts Map')}
            >
              Parts Map
            </li>
            <li 
              className={`px-10 py-5 ${selectedItem === 'Externalized Dialogue' ? 'bg-sky-100 border-l-4 border-sky-600' : ''} text-lg font-semibold`}
              onClick={() => setSelectedItem('Externalized Dialogue')}
            >
              Externalized Dialogue
            </li>
          </ul>
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
