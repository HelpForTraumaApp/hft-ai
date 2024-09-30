// components/TitleList.tsx
import React, { useState, FC, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Virtual, Pagination, Navigation } from 'swiper/modules';
// react icons
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GoPlus } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
// import types
import { TitleProps } from '@/lib/types';
import { Swiper as SwiperClass } from 'swiper';

type TitleListProps = {
  titles: TitleProps[];
  selectedTitle?: TitleProps;
  handleSelectedTitle: (item: TitleProps) => void;
  handleEditTitle: (item: TitleProps) => void;
  handleDeleteTitle: (item: TitleProps) => void;
};

const addTitle: TitleProps = {
  id: '-1',
  title: '',
  ghost: 'Undefined'
};

const TitleList: FC<TitleListProps> = (props) => {
  const { titles, selectedTitle, handleSelectedTitle, handleEditTitle, handleDeleteTitle } = props;
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const pre = () => {
    if (swiperRef) swiperRef.slidePrev();
  };
  const next = () => {
    if (swiperRef) swiperRef.slideNext();
  };

  return (
    <div className="flex items-center p-4 border-b gap-2 justify-center">
      {titles.length > 2 && (
        <div className='flex gap-2 items-center justify-center w-5/6 2xl:w-full'>
          <div
            className='flex px-4 py-3 items-center justify-center cursor-pointer border border-white rounded shadow-md shadow-black'
            onClick={pre}
          >
            <SlArrowLeft className='text-slate-900 font-extrabold' />
          </div>
          <Swiper
            modules={[Virtual, Navigation, Pagination]}
            onSwiper={setSwiperRef}
            slidesPerView={2}
            spaceBetween={8}
            loop={false}
            className='mt-1'
          >
            {titles.map((item, index) => (
              <SwiperSlide key={index} className="w-auto">
                <div className='flex rounded-sm border border-white cursor-pointer w-full h-10'>
                  <span
                    className={`w-full p-2 ${selectedTitle?.id === item.id ? 'bg-slate-300 text-white' : 'bg-white text-black'}`}
                    onClick={() => handleSelectedTitle(item)}
                    role="button"
                  >
                    {item.title}
                  </span>
                  <div
                    className='p-3 bg-[#16c1fb]'
                    onClick={() => handleEditTitle(item)}
                    role="button"
                  >
                    <FiEdit className='text-white' />
                  </div>
                  <div
                    className='p-3 bg-red-500'
                    onClick={() => handleDeleteTitle(item)}
                    role="button"
                  >
                    <IoClose className='text-slate-700' />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className='flex px-4 py-3 items-center justify-center cursor-pointer border border-white rounded shadow-md shadow-black'
            onClick={next}
          >
            <SlArrowRight className='text-slate-900 font-extrabold' />
          </div>
        </div>
      )}
      {titles.length < 3 && (
        <div className='flex flex-row gap-2 mt-1 w-full'>
          {titles.map((item, index) => (
            <div className='flex rounded-sm border border-white cursor-pointer w-full h-10' key={index}>
              <span
                className={`w-full p-2 ${selectedTitle?.id === item.id ? 'bg-slate-300 text-white' : 'bg-white text-black'}`}
                onClick={() => handleSelectedTitle(item)}
                role="button"
              >
                {item.title}
              </span>
              <div
                className='p-3 bg-[#16c1fb]'
                onClick={() => handleEditTitle(item)}
                role="button"
              >
                <FiEdit className='text-white' />
              </div>
              <div
                className='p-3 bg-red-500'
                onClick={() => handleDeleteTitle(item)}
                role="button"
              >
                <IoClose className='text-slate-700' />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='px-3 py-2 cursor-pointer border border-white rounded shadow-md shadow-black'>
        <GoPlus className='text-2xl' onClick={() => handleEditTitle(addTitle)} />
      </div>
    </div>
  );
};

export default TitleList;
