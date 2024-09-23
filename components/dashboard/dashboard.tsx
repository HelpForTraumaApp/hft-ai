'use client'

import { useState } from 'react'
import { DashboardPanel } from './panel'
import { FirstSurveyModal } from '../modals/firstSurveyModal'
import { ThirdSurveyModal } from '../modals/thirdSurveyModal'
import { SecondSurveyModal } from '../modals/secondSurveyModal'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export type ThirdResult = {
  date: Date
  value: number
}

const defaultThirdResult: ThirdResult[] = [
  { date: new Date('2023-2-13'), value: 67 },
  { date: new Date('2023-3-10'), value: 69 },
  { date: new Date('2023-3-10'), value: 88 },
  { date: new Date('2024-6-10'), value: 86 },
  { date: new Date('2024-9-22'), value: 0 },
  { date: new Date('2024-9-22'), value: 100 }
]

export const Dashboard = () => {
  const [modalOpened, setModalOpened] = useState(0)

  const [firstResult, setFirstResult] = useState([6, 6])
  const [secondResult, setSecondResult] = useState(17)
  const [thirdResult, setThirdResult] = useState(defaultThirdResult)

  const handleFirstSurveySubmit = (value: number) => {
    setFirstResult([firstResult[1], value])
    setModalOpened(0)
  }

  const handleSecondSurveySubmit = (value: number) => {
    setSecondResult(value)
    setModalOpened(0)
  }

  const handleThirdSurveySubmit = (value: number) => {
    setThirdResult([...thirdResult, { date: new Date(), value }])
    setModalOpened(0)
  }

  return (
    <div className="grid grid-cols-2 gap-3 mx-3 mt-5">
      <DashboardPanel
        title="Subjective Units of Distress Scale"
        openModal={() => setModalOpened(1)}
      >
        <div className="flex justify-around ">
          <div className="flex flex-col items-center">
            <span className="bg-red-700 text-white text-5xl w-14 h-14 rounded-lg flex justify-center items-center">
              {firstResult[0]}
            </span>
            <p className="text-xs mt-1">Aug 9, 2024</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="bg-amber-500 text-white text-5xl w-16 h-16 rounded-lg flex justify-center items-center">
              {firstResult[1]}
            </span>
            <p className="text-xs mt-1">Aug 3, 2024</p>
          </div>
        </div>
        <h3 className="mx-2 mt-4">
          This measures how you feel at the time you answer the survey. It
          should be done before and after ou work on the ITR programe.
        </h3>
      </DashboardPanel>
      <DashboardPanel
        title="Are You Ready?"
        openModal={() => setModalOpened(2)}
      >
        <h2 className="text-center text-teal-300 text-5xl ">{secondResult}</h2>
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
        openModal={() => setModalOpened(3)}
      >
        <div className="text-left text-md text-neutral-600 ">
          Measures current trauma symptoms. Higher score equals fewer symptoms
        </div>
        <div className="flex-grow-1 mt-4">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              width={870}
              height={350}
              data={thirdResult.map(r => ({
                score: Number(r.value.toFixed(2)),
                date: r.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              }))}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <defs>
                <linearGradient
                  id="gradientColor"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="5%" stopColor="#5BC4FF" stopOpacity="1"></stop>
                  <stop offset="95%" stopColor="#FF5BEF" stopOpacity="1"></stop>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                angle={-20}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={value => `${value}%`}
              />
              <Tooltip
                formatter={(v, n, p) => {
                  return `${v}%`
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="url(#gradientColor)"
                fill="transparent"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashboardPanel>
      {modalOpened == 1 && (
        <FirstSurveyModal
          onClose={() => setModalOpened(0)}
          handleSubmit={handleFirstSurveySubmit}
        />
      )}
      {modalOpened == 2 && (
        <SecondSurveyModal
          onClose={() => setModalOpened(0)}
          handleSubmit={handleSecondSurveySubmit}
        />
      )}
      {modalOpened == 3 && (
        <ThirdSurveyModal
          onClose={() => setModalOpened(0)}
          handleSubmit={handleThirdSurveySubmit}
        />
      )}
    </div>
  )
}
