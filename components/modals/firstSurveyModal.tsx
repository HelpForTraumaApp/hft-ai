import { useState } from 'react'
import { Modal } from './modal'
import { RangeSlider } from '../rangeSlider/rangeSlider'

interface FirstSurveyModal {
  onClose: () => void
  handleSubmit: (value: number) => void
}

const valueStrList = [
  'No Distress',
  'Very Little',
  'Minimal',
  'Mild',
  'Mild to moderate',
  'Moderate to Strong',
  'Anxious',
  'Very Anxious',
  'Extremely Anxious',
  'Worst Ever'
]

export const FirstSurveyModal = ({
  onClose,
  handleSubmit
}: FirstSurveyModal) => {
  const [value, setValue] = useState(1)

  return (
    <Modal onClose={onClose} title="Subjective Units of Distress Scale (SUDS)">
      <div className="question-panel text-center">
        <p className="">Question 1 of 1</p>
        <h2 className="text-xl font-semibold mt-2 min-h-24">
          Rate your level of distress right now on a scale from 1-10:
        </h2>
        <div className="progress-panel">
          <p className="text-center font-semibold text-lg">
            {valueStrList[value - 1]}
          </p>
          <RangeSlider value={value} setValue={setValue} defaultValue={1} />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-[#16c1fb] w-72 max-w-full rounded-lg py-3 text-white mt-auto"
          onClick={() => handleSubmit(value)}
        >
          SUBMIT
        </button>
      </div>
    </Modal>
  )
}
