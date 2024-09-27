'use client'
import CloseIcon from '@/app/assets/icons/close_icon.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Check_Icon from '@/app/assets/icons/check_icon.svg'
import { colorData } from './editStoryModal'

interface ColorModalProps {
  onClose: () => void
  selectColor: (index: number) => void
  selectedColor: number
}

const ColorModal = ({
  onClose,
  selectColor,
  selectedColor
}: ColorModalProps) => {
  return (
    <div className="color-modal z-50">
      <div className="flex justify-between items-center z-50">
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
            onClick={() => selectColor(index)}
            className={'w-6 h-6 rounded-full cursor-pointer'}
            style={{ background: color }}
            key={index}
          >
            {selectedColor == index && (
              <Image width={20} height={20} src={Check_Icon} alt="check" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorModal;