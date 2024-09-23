import { useState } from 'react'
import { Modal } from './modal'
import { RangeSlider } from '../rangeSlider/rangeSlider'

interface FirstSurveyModal {
  onClose: () => void
  handleSubmit: (value: number) => void
}

const questions = [
  'I make it through the day without distressing recollections of past events.',
  'I sleep free from nightmares.',
  'I am able to stay in control when I think of difficult memories.',
  'I do the things I used to avoid (e.g. daily activities, social activities, thoughts of events and people of past events).',
  'I am safe.',
  'I feel safe.',
  'I have supportive relationships in my life.',
  'I find that I can now safely feel a full range of emotions.',
  'I can allow things to happen in my surroundings without needing to control them.',
  'I am able to concentrate on thoughts of my choice.'
]

export const ThirdSurveyModal = ({
  onClose,
  handleSubmit
}: FirstSurveyModal) => {
  const [value, setValue] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [step, setStep] = useState(1)

  const nextStep = () => {
    setStep(val => val + 1)
  }

  const previousStep = () => {
    setStep(val => val - 1)
  }

  return (
    <Modal onClose={onClose} title="Subjective Units of Distress Scale (SUDS)">
      <div className="text-center text-[#6c757d] px-4">
        <p>Developed by Eric Gentry PhD</p>
        <p className="mt-4 text-lg">
          Mark the line where it best represents your experiences in the past
          week.
        </p>
      </div>
      <div className="question-panel text-center">
        <p className="">Question {step} of 10</p>
        <h2 className="text-xl font-semibold mt-2 min-h-24">
          <p className="text-center font-semibold text-lg">
            {questions[step - 1]}
          </p>
        </h2>
        <div className="progress-panel">
          <RangeSlider
            min={0}
            max={10}
            step={1}
            defaultValue={0}
            value={value[step - 1]}
            setValue={newValue => {
              setValue([
                ...value.slice(0, step - 1),
                newValue,
                ...value.slice(step)
              ])
            }}
            stepLabels={[
              '0%',
              '10%',
              '20%',
              '30%',
              '40%',
              '50%',
              '60%',
              '70%',
              '80%',
              '90%',
              '100%'
            ]}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        {step > 1 && (
          <button
            className="bg-[#f8f9fa] border-gray-300 border w-72 max-w-full rounded-lg py-3 text-[#212529] mt-auto"
            onClick={previousStep}
          >
            Back
          </button>
        )}
        {step <= 10 && (
          <button
            className="bg-[#16c1fb] w-72 max-w-full rounded-lg py-3 text-white mt-auto"
            onClick={() => {
              if (step == 10) {
                handleSubmit(
                  (value.reduce((sum, a) => sum + a, 0) * 10) / value.length
                )
              } else {
                nextStep()
              }
            }}
          >
            {step == 10 ? 'SUBMIT' : 'NEXT'}
          </button>
        )}
      </div>
    </Modal>
  )
}
