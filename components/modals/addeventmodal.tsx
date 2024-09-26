import Up_Icon from '@/app/assets/icons/up_icon.svg'
import Down_Icon from '@/app/assets/icons/down_icon.svg'
import { ColorModal } from './colormodal'
import { useEffect, useState } from 'react'
import { EventInfoType } from '@/components/stories/stories'

interface AddEventModalProps {
  onClose: () => void
  handleAddEvent: (eventInfo: EventInfoType) => void
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

export const AddEventModal = ({
  onClose,
  handleAddEvent
}: AddEventModalProps) => {
  const [colorModalOpened, setColorModalOpened] = useState(0)
  const [eventName, setEventName] = useState('')
  const [ageYears, setAgeYears] = useState(0)
  const [ageMonths, setAgeMonths] = useState(1)
  const [eventDescription, setEventDescription] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  const hanleAddEventInfo = () => {
    const eventInfoWillBeAdded: EventInfoType = {
      eventName: eventName,
      ageMonths: ageMonths,
      ageYears: ageYears,
      eventDescription: eventDescription,
      selectedColor: selectedColor
    }
    handleAddEvent(eventInfoWillBeAdded)
  }

  const selectColor = (index: number) => {
    setSelectedColor(colorData[index])
  }
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-[1000] bg-[#0000007f]  fade-in-25 flex justify-center items-center">
      <div className="w-2/3 relative max-w-[800px]">
        <div className="relative flex flex-col w-full text-base pointer-events-auto opacity-100 bg-white bg-clip-padding rounded border-[1px] border-[#0000003f]">
          <div className="flex justify-end items-start p-4">
            <button
              onClick={onClose}
              className="cursor-pointer text-2xl text-gray-500 hover:text-black"
            >
              x
            </button>
          </div>
          <div className="relative flex flex-col flex-grow flex-shrink justify-center flex-auto p-4">
            <h4 className="text-center text-2xl">
              Select from the list on the left or choose your own.
            </h4>
            <div className="flex justify-between mr-3 mt-4">
              <ul className="mt-0 pl-0 mb-4 max-h-[400px] overflow-y-auto">
                {eventData.map((event, index) => (
                  <li key={index}>
                    <button
                      className="relative text-left py-4 px-6 w-full overflow-visible cursor-pointer hover:bg-eventmodal_button_color 
                        hover:border-l-[#16c1fb] hover:border-l-4 hover:underline active:bg-eventmodal_button_color active:border-l-[#16c1fb] 
                        active:border-l-4  after:absolute after:block after:content-none after:w-6 after:h-6 after:rignt-2 after:top-0
                        after:bottom-0 after:mx-auto after:bg-contain after:bg-repeat after:pointer-events-none after:bg-black"
                    >
                      {event.name}
                    </button>
                    <ul>
                      {event.kind.map((content, index1) => (
                        <li className="pl-6" key={index1}>
                          <button
                            onClick={() => setEventName(content)}
                            className="relative text-left py-4 px-6 w-full overflow-visible cursor-pointer hover:bg-eventmodal_button_color
                            hover:border-l-[#16c1fb] hover:border-l-4 hover:underline active:bg-eventmodal_button_color  active:border-l-[#16c1fb]
                            active:border-l-4 after:absolute after:block after:content-none after:w-6 after:h-6 after:rignt-2 after:top-0
                            after:bottom-0 after:mx-auto after:bg-contain after:bg-repeat after:pointer-events-none after:bg-black"
                          >
                            {content}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <div className="flex-grow mt-4">
                <div className="w-full px-4 mx-auto">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={eventName}
                      placeholder="Name the event"
                      className="w-full py-3 px-4 border-[1px] border-[#e4e4e4] rounded bg-[#fafafa] focus:border-[#545dff] focus:outline-none"
                      onChange={e => {
                        setEventName(e.target.value)
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <input
                      value={ageYears}
                      type="number"
                      min="0"
                      placeholder="Age (years)"
                      className="w-full py-3 px-4 border-[1px] border-[#e4e4e4] rounded bg-[#fafafa] focus:border-[#545dff] focus:outline-none"
                      onChange={e => {
                        setAgeYears(Number(e.target.value))
                      }}
                    />
                    <input
                      value={ageMonths}
                      type="number"
                      min="1"
                      max="12"
                      placeholder="Age (months)"
                      className="w-full py-3 px-4 border-[1px] border-[#e4e4e4] rounded bg-[#fafafa] focus:border-[#545dff] focus:outline-none"
                      onChange={e => {
                        setAgeMonths(Number(e.target.value))
                      }}
                    />
                  </div>
                  <div className="relative mb-4">
                    <textarea
                      value={eventDescription}
                      placeholder="Brief description of the event"
                      className="w-full py-3 px-4 border-[1px] border-[#e4e4e4] rounded bg-[#fafafa] focus:border-[#545dff] focus:outline-none"
                      onChange={e => {
                        setEventDescription(e.target.value)
                      }}
                    />
                  </div>
                  <div className="relative mb-4">
                    <button
                      onClick={() => setColorModalOpened(1)}
                      className="flex bg-white border-[1px] border-[#e4e4e4] px-4 py-2 rounded-"
                    >
                      Color
                      <span className="inline-block bg-black rounded-full w-6 h-6 ml-4 my-auto"></span>
                    </button>
                    {colorModalOpened > 0 && (
                      <div className="absolute w-[232px] z-2 p-4 bg-white rounded-md top-0 shadow-[0 47px 74px rgba(0,0,0,.06),0 9.4px 12.025px rgba(0,0,0,.12)]">
                        <ColorModal
                          onClose={() => setColorModalOpened(0)}
                          selectColor={selectColor}
                          colorData={colorData}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={hanleAddEventInfo}
                    className="w-full p-3 rounded-[10px] tracking-[2px] text-white bg-[#16c1fb] hover:bg-[#04ade7]"
                  >
                    ADD EVENT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const eventData: EventType[] = [
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
