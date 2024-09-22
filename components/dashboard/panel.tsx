import { ReactElement } from 'react'

interface DashboardPanelProps {
  title: string
  children: ReactElement | ReactElement[]
  colSpan?: number
}

export const DashboardPanel = ({
  title,
  children,
  colSpan = 1
}: DashboardPanelProps) => {
  return (
    <div
      className={`bg-white text-center rounded-xl p-8 ${colSpan > 1 ? `col-span-${colSpan}` : ''} flex flex-col`}
    >
      <h2 className=" font-semibold text-2xl mx-auto min-h-[64px]">{title}</h2>
      <div className="text-center my-2">{children}</div>
      <button className="bg-blue-500 mx-auto w-72 max-w-full rounded-lg py-3 text-white mt-auto">
        TAKE SURVEY
      </button>
    </div>
  )
}
