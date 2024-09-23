interface RangeSliderProps {
  value: number
  setValue: (value: number) => void
  min?: number
  max?: number
  defaultValue?: number
  step?: number
  stepLabels?: string[]
}

export const RangeSlider = ({
  min = 1,
  max = 10,
  step = 1,
  defaultValue,
  value,
  stepLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  setValue
}: RangeSliderProps) => {
  return (
    <div className="relative">
      {/* <div className="absolute top-[9px] w-full left-0 h-2 bg-[#cacaca] z-[-1]" />
      <div
        className="absolute top-[9px] left-0 h-2 bg-[#16c1fb] z-[-1]"
        style={{ width: `${((value - 1) / (max - min)) * 100}%` }}
      /> */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        className="w-full z-10"
      />
      <div className="step-labels w-full mt-4 flex justify-between">
        {stepLabels.map((l, i) => (
          <span
            key={i}
            className={`text-center ${i == value - min ? 'font-medium' : ''}`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}
