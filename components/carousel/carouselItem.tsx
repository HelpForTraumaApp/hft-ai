import Image from 'next/image'
import { useState } from 'react'
interface CarouselItemProps {
  image: string
  title: string
  isLast: boolean
  onClick: () => void
  openModal: () => void
}
export const CarouselItem = ({
  image,
  title,
  isLast,
  onClick,
  openModal
}: CarouselItemProps) => {
  return (
    <div className="carousel-item" onClick={onClick}>
      <div className="relative bg-white border-gray-300 border-[1px] h-[100px] w-[150px] rounded-lg flex flex-col items-center cursor-pointer">
        {!isLast && (
          <button
            className="absolute bg-red-600 rounded-full items-center left-[-8px] top-[-10px]"
            onClick={() => openModal()}
          >
            <Image
              className="text-black"
              priority
              width={20}
              height={20}
              src="https://www.helpfortrauma.app/img/ic-close-white.svg"
              alt="right-arrow"
            />
          </button>
        )}
        <Image
          className="mt-[10px]"
          priority
          width={60}
          height={60}
          src={image}
          alt="right-arrow"
        />
        <p className="absolute bottom-1 mx-auto">{title}</p>
      </div>
    </div>
  )
}
