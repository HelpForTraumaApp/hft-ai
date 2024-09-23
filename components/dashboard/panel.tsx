import { ReactElement } from 'react'

interface DashboardPanelProps {
  title: string
  children: ReactElement | ReactElement[]
  style?: string
  openModal: () => void
}

export const DashboardPanel = ({
  title,
  children,
  style = '',
  openModal
}: DashboardPanelProps) => {
  return (
    <div
      className={`bg-white text-center rounded-xl p-8 ${style} flex flex-col`}
    >
      <h2 className=" font-semibold text-2xl mx-auto min-h-[64px]">{title}</h2>
      <div className="text-center mt-2 mb-8">{children}</div>
      <button
        className="bg-[#16c1fb] mx-auto w-72 max-w-full rounded-lg py-3 text-white mt-auto"
        onClick={openModal}
      >
        TAKE SURVEY
      </button>
    </div>
  )
}
