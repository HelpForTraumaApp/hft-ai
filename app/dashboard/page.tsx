import { nanoid } from '@/lib/utils'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { DashboardPanel } from '@/components/dashboard/panel'
export default async function DashboardPage() {
  const session = (await auth()) as Session

  return (
    <div className="grid grid-cols-2 gap-3 mx-3 mt-5">
      <DashboardPanel title="Subjective Units of Distress Scale">
        <div className="flex justify-around ">
          <div className="flex flex-col items-center">
            <span className="bg-red-700 text-white text-5xl w-14 h-14 rounded-lg flex justify-center items-center">
              6
            </span>
            <p className="text-xs mt-1">Aug 9, 2024</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="bg-amber-500 text-white text-5xl w-16 h-16 rounded-lg flex justify-center items-center">
              6
            </span>
            <p className="text-xs mt-1">Aug 3, 2024</p>
          </div>
        </div>
        <h3 className="mx-2 mt-4">
          This measures how you feel at the time you answer the survey. It
          should be done before and after ou work on the ITR programe.
        </h3>
      </DashboardPanel>
      <DashboardPanel title="Are You Ready?">
        <h2 className="text-center text-teal-300 text-5xl ">17</h2>
        <h3 className="mx-2 mt-12">
          This survey should be taken before starting the ITR program. If you
          socre under 15, complete the
          <a className="text-teal-300 ml-1">Daily Progress Report</a> and retake
          the survey.
        </h3>
      </DashboardPanel>
      <DashboardPanel
        title="My Trauma Recovery Scale Results"
        style={'col-start-1 col-end-3'}
      >
        <div className="text-left text-md text-neutral-600 ">
          Measures current trauma symptoms. Higher score equals fewer symptoms
        </div>
        <div>
          <img src="/graph.png" />
        </div>
      </DashboardPanel>
    </div>
  )
}
