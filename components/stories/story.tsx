import Close_Icon from '@/app/assets/icons/close_white_icon.svg'
import Edit_Icon from '@/app/assets/icons/edit_icon.svg'
import Image from 'next/image'
import { EventInfo } from './stories'
import { colorData } from '../modals/editStoryModal'
import { useState } from 'react'

interface StoryProps {
  eventData: EventInfo
  openDeleteModal: () => void
  openEditModal: () => void
  onClick: () => void
  isRightDirection: boolean
}

export const Story = ({
  eventData,
  openEditModal,
  openDeleteModal,
  onClick,
  isRightDirection
}: StoryProps) => {
  const [isHover, setIsHover] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <div className="story-item">
      <div
        className="flex hover:cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          flexDirection: isRightDirection ? 'row-reverse' : 'row',
          marginRight: isRightDirection ? 'calc(50% - 54px)' : '',
          marginLeft: isRightDirection ? '' : 'calc(50% - 58px)'
        }}
        onClick={onClick}
      >
        <div className="date-content">
          <div
            className={`rounded-lg px-4 py-2 text-base font-medium text-center w-28 min-h-16 flex items-center justify-center`}
            style={{
              color: isHover ? 'white' : colorData[eventData.selectedColor],
              backgroundColor: isHover
                ? colorData[eventData.selectedColor]
                : '#ffffff'
            }}
          >
            <div>
              {Number(eventData.ageYears) > 0 && (
                <p>{eventData.ageYears} Years</p>
              )}
              {Number(eventData.ageMonths) > 0 && (
                <p>{eventData.ageMonths} Months</p>
              )}
            </div>
          </div>
        </div>
        <div
          className="grow my-auto h-1"
          style={{
            backgroundColor: isHover
              ? colorData[eventData.selectedColor]
              : '#ffffff',
            minWidth: '50px'
          }}
        ></div>
        <div
          className="relative bg-white flex items-center text-center text-2xl font-medium rounded-lg p-1 my-2"
          style={{
            borderColor: isHover
              ? colorData[eventData.selectedColor]
              : '#ffffff',
            borderWidth: '2px'
          }}
        >
          <p>{eventData.eventName}</p>
          <div className="absolute -top-3 -left-3 flex flex-start">
            <button
              onClick={openDeleteModal}
              className="bg-[#dc3545] rounded-full p-1 flex items-center justify-center"
            >
              <Image
                width={16}
                height={16}
                src={Close_Icon}
                alt="close"
                className="text-white"
              />
            </button>
            <button
              onClick={openEditModal}
              className="bg-[#16c1fb] rounded-full p-1 ml-1"
            >
              <Image
                className=""
                width={16}
                height={16}
                src={Edit_Icon}
                alt="edit"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
