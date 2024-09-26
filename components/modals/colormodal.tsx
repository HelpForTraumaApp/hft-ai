'use client'
import CloseIcon from '@/app/assets/icons/close_icon.svg'
import Image from 'next/image'
import { useEffect } from 'react'

interface ColorModalProps {
  onClose: () => void
  handleSortByColor: (index: number) => void
  colorData: string[]
}

export const ColorModal = ({
  onClose,
  handleSortByColor,
  colorData
}: ColorModalProps) => {
  useEffect(() => {}, [])

  return (
    <div className="absolute w-[232px] z-2 p-4 bg-white rounded-md top-[68px]  shadow-[0 47px 74px rgba(0,0,0,.06),0 9.4px 12.025px rgba(0,0,0,.12)]">
      <div className="flex justify-between items-center">
        <span>Color</span>
        <button
          onClick={onClose}
          className="px-1 py-2 cursor-pointer text-[13px] border-[f8f9fa] text-[#212529] bg-[#f8f9fa] hover:border-[#dae0e5] hover:text-[#212529] hover:bg-[#e2e6ea] rounded-[1px] flex items-center justify-center"
        >
          <Image
            className=""
            height={24}
            width={24}
            src={CloseIcon}
            alt="close"
          />
        </button>
      </div>
      <div className="mt-4 ml-3 items-center grid grid-cols-4 gap-4">
        {colorData.map((key, index) => (
          <button
            onClick={() => handleSortByColor(index)}
            className={`w-[24px] h-[24px] rounded-full cursor-pointer bg-black`}
          ></button>
        ))}
      </div>
    </div>
  )
}
