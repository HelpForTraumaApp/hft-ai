import { ReactElement } from 'react'

interface DashboardPanelProps {
  title: string
  children: ReactElement | ReactElement[]
  style?: string
}

export const DashboardPanel = ({
  title,
  children,
  style = ''
}: DashboardPanelProps) => {
  return (
    <div
      className={`bg-white text-center rounded-xl p-8 ${style} flex flex-col`}
    >
      <h2 className=" font-semibold text-2xl mx-auto min-h-[64px]">{title}</h2>
      <div className="text-center my-2">{children}</div>
      <button className="bg-blue-500 mx-auto w-72 max-w-full rounded-lg py-3 text-white mt-auto">
        TAKE SURVEY
      </button>
    </div>
  )
}
