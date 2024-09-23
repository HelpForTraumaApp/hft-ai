import { useState } from 'react'
import { Modal } from './modal'
import { RangeSlider } from '../rangeSlider/rangeSlider'

interface FirstSurveyModal {
  onClose: () => void
  handleSubmit: (value: number) => void
}

const questions = [
  'I can get out of bed every morning.',
  'I eat my meals regularly.',
  'I exercise regularly.',
  'I am responsible for my daily schedule without having to be reminded by other people.',
  'I can focus on the here and now even if I have difficulty with my past.',
  'I am able to take care of myself and regulate my emotions.'
]

export const SecondSurveyModal = ({
  onClose,
  handleSubmit
}: FirstSurveyModal) => {
  const [value, setValue] = useState<number[]>([0, 0, 0, 0, 0, 0])
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
        <p>Developed by Linda Gantt PhD, ATR-BC</p>
        <p className="mt-4 text-lg">
          This questionnaire contains six items about experiences you may have
          in your daily life. To answer these items, please determine to what
          degree the experiences apply to you. <br />0 = Never 5= Always
        </p>
      </div>
      <div className="question-panel text-center">
        <p className="">Question {step} of 6</p>
        <h2 className="text-xl font-semibold mt-2 min-h-24">
          <p className="text-center font-semibold text-lg">
            {questions[step - 1]}
          </p>
        </h2>
        <div className="progress-panel">
          <RangeSlider
            min={0}
            max={5}
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
            stepLabels={['0', '1', '2', '3', '4', '5']}
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
        {step <= 6 && (
          <button
            className="bg-[#16c1fb] w-72 max-w-full rounded-lg py-3 text-white mt-auto"
            onClick={() => {
              if (step == 6) {
                handleSubmit(value.reduce((sum, a) => sum + a, 0))
              } else {
                nextStep()
              }
            }}
          >
            {step == 6 ? 'SUBMIT' : 'NEXT'}
          </button>
        )}
      </div>
    </Modal>
  )
}
