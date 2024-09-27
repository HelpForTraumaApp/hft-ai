'use client'
import RGB_Color_Icon from '@/app/assets/icons/rgb_color_icon.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { EditStoryModal } from '@/components/modals/editStoryModal'
import { Story } from './story'
import { useRouter } from 'next/navigation'
import { ExcalidrawContent } from '../partMap/partMap'
import { ColorModal } from '../modals/colorModal'
import { DeleteStoryModal } from '../modals/deleteStoryModal'

export type EventInfo = {
  eventName: string
  ageYears: string
  ageMonths: string
  eventDescription: string
  selectedColor: number
  excalidrawContentList?: ExcalidrawContent[]
}

const emptyEventInfo: EventInfo = {
  eventName: '',
  ageYears: '',
  ageMonths: '',
  eventDescription: '',
  selectedColor: 0
}

export const Stories = () => {
  const [colorModalOpened, setColorModalOpened] = useState(false)
  const [selectedColorForFilter, setSelectedColorForFilter] = useState(-1)

  const [editModalOpened, setEditModalOpened] = useState(false)
  const [eventDeleteModalOpened, setEventDeleteModalOpened] = useState(false)

  const [eventList, setEventList] = useState<EventInfo[]>([])
  const [currentEventIndex, setCurrentEventIndex] = useState(-1)

  const [initialized, setInitialized] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const loadContents = async () => {
      const savedData: EventInfo[] = JSON.parse(
        localStorage.getItem('stories') || '[]'
      )

      setEventList(savedData)
    }

    loadContents()
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('stories', JSON.stringify(eventList))
    }
  }, [eventList, initialized])

  const handleFilterByColor = (index: number) => {
    setSelectedColorForFilter(selectedColorForFilter == index ? -1 : index)
  }

  const handleDeleteEvent = (index: number) => {
    const newEventList = [...eventList]
    newEventList.splice(index, 1)
    setEventList(newEventList)
    setEventDeleteModalOpened(false)
  }

  const handleEditEvent = (index: number) => {
    setCurrentEventIndex(index)
    setEditModalOpened(true)
  }

  const handleSaveEvent = (eventInfo: EventInfo, index: number) => {
    console.log(eventInfo, index)
    const newEventList = [...eventList]

    if (index == -1) {
      newEventList.push(eventInfo)
    } else {
      newEventList[index] = eventInfo
    }

    setEditModalOpened(false)
    setEventList(newEventList)
  }

  const handleOpenExcalidrawPanel = (index: number) => {
    router.push(`/stories/${index}`)
  }

  return (
    <div className="relative mx-auto px-12">
      <div className="flex items-center justify-center">
        <h1 className="text-[#282842] text-[40px]">Timeline</h1>
      </div>
      <div className="pt-2 flex justify-start">
        <button
          onClick={() => setColorModalOpened(true)}
          className="bg-white flex justify-around px-4 py-2 rounded cursor-pointer shadow-[0_1px_1px_0px_rgba(0,0,0,0.5)] hover:bg-[#f7f7f7]"
        >
          <Image
            className="mr-2"
            width={24}
            height={24}
            src={RGB_Color_Icon}
            alt="rgb color icon"
          />
          Color
        </button>
      </div>
      <div className="text-md text-center">
        <button
          onClick={() => {
            setCurrentEventIndex(-1)
            setEditModalOpened(true)
          }}
          className="py-4 px-3 mt-2 tracking-[2px] rounded-[6px] leading-[1.5px] bg-[#16c1fb] text-white hover:bg-[#04ade7]"
        >
          ADD EVENT
        </button>
      </div>

      {colorModalOpened && (
        <div className="absolute z-50 w-[232px] z-2 p-4 bg-white rounded-md top-16 color-modal-wrapper">
          <ColorModal
            onClose={() => setColorModalOpened(false)}
            selectColor={handleFilterByColor}
            selectedColor={selectedColorForFilter}
          />
        </div>
      )}

      {editModalOpened && (
        <EditStoryModal
          eventInfo={
            currentEventIndex == -1
              ? emptyEventInfo
              : eventList[currentEventIndex]
          }
          onClose={() => setEditModalOpened(false)}
          handleSubmit={handleSaveEvent}
          index={currentEventIndex}
        />
      )}

      {(selectedColorForFilter == -1
        ? eventList
        : eventList.filter(
            event => event.selectedColor == selectedColorForFilter
          )
      )
        ?.sort((a, b) => {
          if (a.ageYears < b.ageYears) return -1
          if (a.ageYears > b.ageYears) return 1
          if (a.ageMonths < b.ageMonths) return -1
          return 1
        })
        .map((eventData, index) => (
          <Story
            eventData={eventData}
            openDeleteModal={() => {
              setCurrentEventIndex(index)
              setEventDeleteModalOpened(true)
            }}
            openEditModal={() => handleEditEvent(index)}
            onClick={() => handleOpenExcalidrawPanel(index)}
            isRightDirection={index % 2 == 0 ? true : false}
          />
        ))}

      {eventDeleteModalOpened && (
        <DeleteStoryModal
          onClose={() => setEventDeleteModalOpened(false)}
          handleSubmit={() => handleDeleteEvent(currentEventIndex)}
        />
      )}
    </div>
  )
}
