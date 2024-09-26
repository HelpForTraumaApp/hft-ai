import Up_Icon from '@/app/assets/icons/up_icon.svg'
import Down_Icon from '@/app/assets/icons/down_icon.svg'
interface AddEventModalProps {
  onClose: () => void
}

export const AddEventModal = ({ onClose }: AddEventModalProps) => {
  return (
    <>
      <div className="fixed top-0 left-0 z-1000 w-lvw h-lvh bg-black opacity-50 fade-in-25"></div>
      <div className=" fixed top-[64px] left-[300px] z-1050 w-2/3 h-full">
        <div className="relative w-max-[800] mt-[120px] mx-auto max-w-[800px] ">
          <div className="relative flex flex-col w-full text-[16px] pointer-events-auto opacity-100 bg-white bg-clip-padding rounded-[5px] border-[1px] border-[ rgba(0,0,0,.2)]">
            <div className="flex justify-end items-start p-4">
              <button className="cursor-pointer text-[24px] text-gray-500 hover:text-black">
                x
              </button>
            </div>
            <div className="relative flex flex-col flex-grow flex-shrink justify-center flex-auto   p-4">
              <h4 className="text-center text-[24px]">
                Select from the list on the left or choose your own.
              </h4>
              <div className="flex justify-between mr-3 mt-4">
                <ul className="mt-0 pl-0 mb-4">
                  <li>
                    <button
                      className="relative text-left py-[16px] px-[24px] w-full overflow-visible cursor-pointer
                       hover:bg-eventmodal_button_color  hover:border-l-[#16c1fb] hover:border-l-[4px] hover:underline
                       after:absolute after:block after:content-none after:w-[24px] after:h-[24px] after:rignt-[8px] after:top-0
                       after:bottom-0 after:mx-auto after:bg-contain after:bg-repeat after:pointer-events-none after:bg-black
                       "
                    >
                      Preverbal/Birth
                    </button>
                  </li>
                  <li>
                    <button
                      className="relative text-left py-[16px] px-[24px] w-full overflow-visible cursor-pointer
                       hover:bg-eventmodal_button_color  hover:border-l-[#16c1fb] hover:border-l-[4px] hover:underline
                       after:absolute after:block after:content-none after:w-[24px] after:h-[24px] after:rignt-[8px] after:top-0
                       after:bottom-0 after:mx-auto after:bg-contain after:bg-repeat after:pointer-events-none after:bg-black
                       "
                    >
                      Parental/Caregiver
                    </button>
                  </li>
                  <li>
                    <button
                      className="relative text-left py-[16px] px-[24px] w-full overflow-visible cursor-pointer
                       hover:bg-eventmodal_button_color  hover:border-l-[#16c1fb] hover:border-l-[4px] hover:underline
                       after:absolute after:block after:content-none after:w-[24px] after:h-[24px] after:rignt-[8px] after:top-0
                       after:bottom-0 after:mx-auto after:bg-contain after:bg-repeat after:pointer-events-none after:bg-black
                       "
                    >
                      Physical
                    </button>
                  </li>
                  <li>
                    <button
                      className="relative text-left py-[16px] px-[24px] w-full overflow-visible cursor-pointer
                       hover:bg-eventmodal_button_color  hover:border-l-[#16c1fb] hover:border-l-[4px] hover:underline
                       after:absolute after:block after:content-none after:w-[24px] after:h-[24px] after:rignt-[8px] after:top-0
                       after:bottom-0 after:mx-auto after:bg-contain after:bg-repeat after:pointer-events-none after:bg-black
                       "
                    >
                      Emotional
                    </button>
                  </li>
                  <li>
                    <button
                      className="relative text-left py-[16px] px-[24px] w-full overflow-visible cursor-pointer
                       hover:bg-eventmodal_button_color  hover:border-l-[#16c1fb] hover:border-l-[4px] hover:underline
                       after:absolute after:block after:content-none after:w-[24px] after:h-[24px] after:rignt-[8px] after:top-0
                       after:bottom-0 after:mx-auto after:bg-contain after:bg-repeat after:pointer-events-none after:bg-black
                       "
                    >
                      Sexual
                    </button>
                  </li>
                  <li>
                    <button
                      className="relative text-left py-[16px] px-[24px] w-full overflow-visible cursor-pointer
                       hover:bg-eventmodal_button_color  hover:border-l-[#16c1fb] hover:border-l-[4px] hover:underline
                       after:absolute after:block after:content-none after:w-[24px] after:h-[24px] after:rignt-[8px] after:top-0
                       after:bottom-0 after:mx-auto after:bg-contain after:bg-repeat after:pointer-events-none after:bg-black
                       "
                    >
                      Natural Disaster
                    </button>
                  </li>
                  <li>
                    <button
                      className="relative text-left py-[16px] px-[24px] w-full overflow-visible cursor-pointer
                       hover:bg-eventmodal_button_color  hover:border-l-[#16c1fb] hover:border-l-[4px] hover:underline
                       after:absolute after:block after:content-none after:w-[24px] after:h-[24px] after:rignt-[8px] after:top-0
                       after:bottom-0 after:mx-auto after:bg-contain after:bg-repeat after:pointer-events-none after:bg-black
                       "
                    >
                      First Responder
                    </button>
                  </li>
                </ul>
                <div className="flex-grow mt-4">
                  <div className="w-full px-[15px] mx-auto">
                    <div className="relative mb-[16px]">
                      <input
                        type="text"
                        placeholder="Name the event"
                        className="w-full py-[13px] px-[16px] border-[1px] border-solid border-[#e4e4e4]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
