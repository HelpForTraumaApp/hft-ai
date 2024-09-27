import Image from 'next/image'
import { useRef, useState } from 'react'
import { CarouselItem } from './carouselItem'
import ArrowLeft from '@/app/assets/icons/left_arrow.svg'
import ArrowRight from '@/app/assets/icons/right_arrow.svg'
import IconPlus from '@/app/assets/icons/plus_icon.svg'
import { ExcalidrawContent } from '../partMap/partMap'
import { DeleteStoryModal } from '../modals/deleteStoryModal'

interface PathMapCarouselProps {
  contentList: ExcalidrawContent[]
  handleAddScene: () => void
  handleSelect: (index: number) => void
  handleDeleteScene: (index: number) => void
}

export const PathMapCarousel = ({
  contentList,
  handleAddScene,
  handleSelect,
  handleDeleteScene
}: PathMapCarouselProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [indexWillBeDeleted, setIndexWillBeDeleted] = useState(-1)

  const handleScroll = (direction: 'left' | 'right') => {
    if (!ref.current) return

    ref.current.scrollLeft =
      ref.current.scrollLeft + 160 * (direction == 'left' ? -1 : 1)
  }

  const handleDelete = () => {
    handleDeleteScene(indexWillBeDeleted)
    setIndexWillBeDeleted(-1)
  }

  return (
    <>
      <div className="flex justify-center w-full items-center p-4">
        <button
          className="w-[42px] h-[35px] min-w-[42px] min-h-[35px]"
          onClick={() => handleScroll('left')}
        >
          <Image
            priority
            width={30}
            height={30}
            src={ArrowLeft}
            alt="left-arrow"
            className="mx-auto"
          />
        </button>
        <div
          className="flex gap-2 overflow-y-auto relative w-auto scrollbar-hidden scroll-smooth pt-3"
          ref={ref}
        >
          {contentList.map((content, index) => (
            <CarouselItem
              image={content.image}
              title={content.title}
              isLast={contentList.length == 1}
              key={index}
              openModal={() => setIndexWillBeDeleted(index)}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>
        <button
          className="w-[42px] h-[35px] min-w-[42px] min-h-[35px]"
          onClick={() => handleScroll('right')}
        >
          <Image
            priority
            width={30}
            height={30}
            src={ArrowRight}
            alt="right-arrow"
            className="mx-auto"
          />
        </button>
        <button
          className="bg-slate-500 p-4 rounded-md"
          onClick={handleAddScene}
        >
          <Image priority src={IconPlus} height={40} width={40} alt={'aaaa'} />
        </button>
      </div>
      {indexWillBeDeleted >= 0 && (
        <DeleteStoryModal
          onClose={() => setIndexWillBeDeleted(-1)}
          handleSubmit={handleDelete}
        />
      )}
    </>
  )
}
