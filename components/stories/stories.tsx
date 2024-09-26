'use client'
import RGB_Color_Icont from '@/app/assets/icons/rgb_color_icon.svg'
import Image from 'next/image'
import { ColorModal } from '@/components/modals/colormodal'
import { useState } from 'react'
import { AddEventModal, colorData } from '@/components/modals/addeventmodal'

export type EventInfoType = {
  eventName: string
  ageYears: number
  ageMonths: number
  eventDescription: string
  selectedColor: string
}

export const Stories = () => {
  const [colorModalOpened, setColorModalOpened] = useState(0)
  const [eventModalOpened, setEventModalOpened] = useState(0)
  const [selectedColorForSort, setSelectedColorForSort] = useState('')
  const [eventDetailInfo, setEventDetailInfo] = useState<EventInfoType | null>(
    null
  )

  const handleSortByColor = (index: number) => {
    setSelectedColorForSort(colorData[index])
  }

  const addEvent = (eventInfo: EventInfoType) => {}

  return (
    <div className="relative mx-auto px-12">
      <div className="flex items-center justify-center">
        <h1 className="text-[#282842] text-[40px]">Timeline</h1>
      </div>
      <div className="pt-2 flex justify-start">
        <button
          onClick={() => setColorModalOpened(1)}
          className="bg-white flex justify-around px-4 py-2 rounded cursor-pointer shadow-[0_1px_1px_0px_rgba(0,0,0,0.5)] hover:bg-[#f7f7f7]"
        >
          <Image
            className="mr-2"
            width={24}
            height={24}
            src={RGB_Color_Icont}
            alt="rgb color icon"
          />
          Color
        </button>
      </div>
      <div className="text-md text-center">
        <button
          onClick={() => setEventModalOpened(1)}
          className="py-4 px-3 mt-2 tracking-[2px] rounded-[6px] leading-[1.5px] bg-[#16c1fb] text-white hover:bg-[#04ade7]"
        >
          ADD EVENT
        </button>
      </div>
      {colorModalOpened > 0 && (
        <div className="absolute w-[232px] z-2 p-4 bg-white rounded-md top-16 shadow-[0 47px 74px rgba(0,0,0,.06),0 9.4px 12.025px rgba(0,0,0,.12)]">
          <ColorModal
            onClose={() => setColorModalOpened(0)}
            selectColor={handleSortByColor}
            colorData={colorData}
          />
        </div>
      )}
      {eventModalOpened > 0 && (
        <AddEventModal
          onClose={() => setEventModalOpened(0)}
          handleAddEvent={addEvent}
        />
      )}
    </div>
  )
}
