import Up_Icon from '@/app/assets/icons/up_icon.svg'
import Down_Icon from '@/app/assets/icons/down_icon.svg'
import { ColorModal } from './colorModal'
import { useEffect, useState } from 'react'
import { EventInfo } from '@/components/stories/stories'
import Image from 'next/image'

interface EditStoryModalProps {
  onClose: () => void
  handleSubmit: (eventInfo: EventInfo, index: number) => void
  eventInfo: EventInfo
  index: number
}

export const colorData: string[] = [
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

export type EventType = {
  name: string
  kind: string[]
}

export const EditStoryModal = ({
  onClose,
  handleSubmit,
  eventInfo,
  index
}: EditStoryModalProps) => {
  const [colorModalOpened, setColorModalOpened] = useState(0)
  const [eventName, setEventName] = useState('')
  const [ageYears, setAgeYears] = useState('')
  const [ageMonths, setAgeMonths] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [selectedColor, setSelectedColor] = useState(-1)
  const [openedDropDowns, setOpendDropDowns] = useState<boolean[]>([false])

  useEffect(() => {
    if (eventInfo.eventName == undefined) return
    setEventName(eventInfo.eventName)
    setAgeYears(eventInfo.ageYears)
    setAgeMonths(eventInfo.ageMonths)
    setEventDescription(eventInfo.eventDescription)
    setSelectedColor(eventInfo.selectedColor)
  }, [])

  const hanleSaveEventInfo = () => {
    const eventInfoWillBeAdded: EventInfo = {
      eventName: eventName,
      ageMonths: ageMonths,
      ageYears: ageYears,
      eventDescription: eventDescription,
      selectedColor: selectedColor
    }
    handleSubmit(eventInfoWillBeAdded, index)
  }

  const selectColor = (index: number) => {
    setSelectedColor(index)
  }

  const openDropDown = (index: number) => {
    const dropDownInfo = [...openedDropDowns]
    dropDownInfo[index] = !dropDownInfo[index]
    setOpendDropDowns(dropDownInfo)
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-[1000] bg-[#0000007f]  fade-in-25 flex justify-center items-center">
      <div className="w-2/3 relative max-w-[800px]">
        <div className="relative flex flex-col w-full text-base pointer-events-auto opacity-100 bg-white bg-clip-padding rounded border-[1px] border-[#0000003f]">
          <div className="flex justify-end items-start p-4 mr-2">
            <button
              onClick={onClose}
              className="cursor-pointer text-2xl text-gray-500 hover:text-black"
            >
              &times;
            </button>
          </div>
          <div className="relative flex flex-col flex-grow flex-shrink justify-center flex-auto p-4">
            <h4 className="text-center text-2xl">
              Select from the list on the left or choose your own.
            </h4>
            <div className="flex justify-between mr-3 mt-4">
              <ul className="mt-0 pl-0 w-[300px] h-[400px] max-h-[400px] overflow-y-auto">
                {eventCategory.map((event, index) => (
                  <li key={index}>
                    <button
                      onClick={() => openDropDown(index)}
                      className="flex justify-between items-center text-left py-4 px-6 w-full cursor-pointer hover:bg-[#16c1fb0d] 
                        hover:border-l-[#16c1fb] border-l-4 hover:underline font-semibold leading-4"
                      style={{
                        borderLeftColor: openedDropDowns[index]
                          ? '#16c1fb'
                          : 'transparent',
                        textDecoration: openedDropDowns[index]
                          ? 'underline'
                          : 'none',
                        background: openedDropDowns[index]
                          ? '#16c1fb0d'
                          : 'transparent'
                      }}
                    >
                      {event.name}
                      <Image
                        width={24}
                        height={24}
                        src={openedDropDowns ? Down_Icon : Up_Icon}
                        alt="up"
                      />
                    </button>
                    {openedDropDowns[index] &&
                      event.kind.map((content, index1) => (
                        <li className="pl-6" key={index1}>
                          <button
                            onClick={() => setEventName(content)}
                            className="text-left py-4 px-6 w-full overflow-visible cursor-pointer hover:bg-[#16c1fb0d]
                            hover:border-l-[#16c1fb] border-l-4 hover:underline border-l-transparent"
                          >
                            {content}
                          </button>
                        </li>
                      ))}
                    <ul></ul>
                  </li>
                ))}
              </ul>
              <div className="flex-grow mt-4 px-4 flex flex-col gap-4">
                <div>
                  <input
                    type="text"
                    value={eventName}
                    placeholder="Name the event"
                    className="w-full py-3 px-4 border-[1px] border-[#e4e4e4] rounded bg-[#fafafa] focus:border-[#545dff] focus:outline-none"
                    onChange={e => {
                      setEventName(e.target.value)
                    }}
                    required
                  />
                </div>
                <div className="flex justify-between gap-4">
                  <input
                    value={ageYears}
                    type="number"
                    min="0"
                    placeholder="Age (years)"
                    className="w-full py-3 px-4 border-[1px] border-[#e4e4e4] rounded bg-[#fafafa] focus:border-[#545dff] focus:outline-none"
                    onChange={e => {
                      setAgeYears(e.target.value)
                    }}
                  />
                  <input
                    value={ageMonths}
                    type="number"
                    min="0"
                    max="12"
                    placeholder="Age (months)"
                    className="w-full py-3 px-4 border-[1px] border-[#e4e4e4] rounded bg-[#fafafa] focus:border-[#545dff] focus:outline-none"
                    onChange={e => {
                      setAgeMonths(e.target.value)
                    }}
                  />
                </div>
                <div>
                  <textarea
                    value={eventDescription}
                    placeholder="Brief description of the event"
                    className="w-full py-3 px-4 border-[1px] border-[#e4e4e4] rounded bg-[#fafafa] focus:border-[#545dff] focus:outline-none"
                    onChange={e => {
                      setEventDescription(e.target.value)
                    }}
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setColorModalOpened(1)}
                    className="flex bg-white border-[1px] border-[#e4e4e4] px-4 py-2 rounded"
                  >
                    Color
                    <span
                      style={{ background: colorData[selectedColor] }}
                      className="inline-block rounded-full w-6 h-6 ml-4 my-auto"
                    ></span>
                  </button>
                  {colorModalOpened > 0 && (
                    <div className="absolute w-[232px] z-2 p-4 bg-white rounded-md top-0 color-modal-wrapper">
                      <ColorModal
                        onClose={() => setColorModalOpened(0)}
                        selectColor={selectColor}
                        selectedColor={selectedColor}
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={hanleSaveEventInfo}
                  className="w-full p-3 rounded-[10px] tracking-[2px] text-white bg-[#16c1fb] hover:bg-[#04ade7] mt-4"
                >
                  {index == -1 ? 'ADD EVENT' : 'UPDATE EVENT'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const eventCategory: EventType[] = [
  {
    name: 'Preverval/Birth',
    kind: [
      'Adoption',
      'Medical/Surgery',
      'Complications',
      'Alcohol/Drugs',
      'Stressful Enviroment',
      'Other'
    ]
  },
  {
    name: 'Parental/Caregiver',
    kind: [
      'Adoption',
      'Foster Care',
      'Day Care',
      'Negiect',
      'Alcohol/Drugs',
      'Prison',
      'Death',
      'Other'
    ]
  },
  {
    name: 'Physical',
    kind: [
      'Accident',
      'Medical/Illness/Surgery',
      'Domestic Violence',
      'Sibling Abuse',
      'Assault',
      'Bullying',
      'Mugging',
      'Near Drowning',
      'Capacity',
      'Imprisonment',
      'Other'
    ]
  },
  {
    name: 'Emotional',
    kind: [
      'Death/Illness of Loved One',
      'Witnessing Trauma',
      'Humillation',
      'Religious',
      'Secrets',
      'Tragic News',
      'Torture',
      'Racial',
      'Enviroment',
      'Divorce',
      'Abandoment',
      'Other'
    ]
  },
  {
    name: 'Sexual',
    kind: [
      'Harrassment',
      'Abuse',
      'Incest',
      'Stranger Rape',
      'Date Rape',
      'Sex Work',
      'Trafficking',
      'Other'
    ]
  },
  {
    name: 'Natural Disaster',
    kind: [
      'Fire',
      'Hurricane',
      'Earthquake',
      'Tsunaml',
      'Flood',
      'Pandomic',
      'Other'
    ]
  },
  {
    name: 'First Responder',
    kind: [
      'Military',
      'Police',
      'Firefighter',
      'Protection Worker CHild/Adult',
      '911 Dispatch',
      'Emergency Response',
      'Crisis Worker',
      'Medical/Mental Health Worker'
    ]
  }
]
