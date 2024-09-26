'use client'
import CloseIcon from '@/app/assets/icons/close_icon.svg'
import Image from 'next/image'
import { useEffect } from 'react'
import Check_Icon from '@/app/assets/icons/check_icon.svg'

interface ColorModalProps {
  onClose: () => void
  selectColor: (index: number) => void
  colorData: string[]
}

const ColorModal = ({
  onClose,
  selectColor,
  colorData
}: ColorModalProps) => {
  useEffect(() => {}, [])

  const selectedColor = (index: number) => {
    selectColor(index)
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <span>Color</span>
        <button
          onClick={onClose}
          className="w-8 h-8 cursor-pointer border-[f8f9fa] text-[#212529] bg-[#f8f9fa] hover:border-[#dae0e5] hover:bg-[#e2e6ea] flex items-center justify-center"
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
        {colorData.map((color, index) => (
          <button
            onClick={() => selectedColor(index)}
            className={'w-6 h-6 rounded-full cursor-pointer'}
            style={{ background: color }}
            key={index}
          ></button>
        ))}
      </div>
    </>
  )
}

export default ColorModal;