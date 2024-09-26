'use client'
import RGB_Color_Icont from '@/app/assets/icons/rgb_color_icon.svg'
import Image from 'next/image'
import { ColorModal } from '../modals/colormodal'
import { useState } from 'react'
import { AddEventModal } from '../modals/addeventmodal'
export const Stories = () => {
  const [colorModalOpened, setColorModalOpened] = useState(0)
  const [eventModalOpened, setEventModalOpened] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')

  const handleSortByColor = (index: number) => {
    console.log('aaa', index)
  }

  const colorData: string[] = [
    '#343032',
    '#A7A9AC',
    '#5365FA',
    '#FCF31C',
    '#FC3F50',
    '#69C6F7',
    '#9AD39B',
    '#38795F',
    '#5A41A8',
    '#FF874F',
    '#FF874F',
    '#ED95C9',
    '#F1E2D4',
    '#E8DAC0',
    '#C6A889',
    '#976F5B'
  ]

  return (
    <div className="relative mx-auto px-12">
      <div className="flex items-center justify-center">
        <h1 className="text-[#282842] text-[40px]">Timeline</h1>
      </div>
      <div className="pt-2 flex justify-start">
        <button
          onClick={() => setColorModalOpened(1)}
          className="bg-white flex justify-around px-4 py-2 rounded-[6px] border-[#e4e4e4]  cursor-pointer shadow-[0_1px_1px_0px_rgba(0,0,0,0.5)] hover:bg-[#f7f7f7] "
        >
          <Image
            className="mr-2"
            width={24}
            height={24}
            src={RGB_Color_Icont}
            alt="rgb_color_icon"
          />
          Color
        </button>
      </div>
      <div className="text-md text-center   ">
        <button
          onClick={() => setEventModalOpened(1)}
          className="py-4 px-3 mt-2 tracking-[2px] rounded-[6px] leading-[1.5px] border-[#16c1fb] bg-[#16c1fb] text-white hover:bg-[#04ade7]"
        >
          ADD EVENT
        </button>
      </div>
      {colorModalOpened > 0 && (
        <ColorModal
          onClose={() => setColorModalOpened(0)}
          handleSortByColor={handleSortByColor}
          colorData={colorData}
        />
      )}
      {eventModalOpened > 0 && (
        <AddEventModal onClose={() => setColorModalOpened(0)} />
      )}
    </div>
  )
}
