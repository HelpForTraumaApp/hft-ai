'use client'

import React from 'react'
import Image from 'next/image'
import ReactPlayer from 'react-player'

//images
import groundingImage1 from '@/app/assets/grounding/1-1.png'
import groundingImage2 from '@/app/assets/grounding/1-2.png'
import groundingImage3 from '@/app/assets/grounding/2-1.png'
import groundingImage4 from '@/app/assets/grounding/2-2.png'
import groundingImage5 from '@/app/assets/grounding/3-1.png'
import groundingImage6 from '@/app/assets/grounding/3-2.png'

export const Grounding = () => {
  const video_url = 'https://vimeo.com/417307026'

  return (
    <div className="flex flex-col">
      <div className="bg-gray-300 text-center">Grounding</div>
      <div className="flex flex-col w-full items-center">
        <ReactPlayer url={video_url} playing={false} controls={true} />
        <div className="bg-white p-8">
          <div className=" text-[#523d78] uppercase text-xl font-extrabold">
            grounding:getting reconnected
          </div>
          <div className="text-base">
            <p>
              Grounding refers to a state of mental awareness in which a person
              is fully present is fully in the here and now and has access to
              "logical" brain functions. Grounding techniques can help improve
              logical thinking, restore balance, and serve as effective
              distractions from uncomfortable sensations and emotional states
              like anxiety, anger, sadness, fear, or self-harm tendencies.
            </p>
          </div>
          <div className="grid grid-cols-3">
            <Image src={groundingImage1} alt="sight" />
            <Image src={groundingImage2} alt="smell" />
            <Image src={groundingImage3} alt="sound" />
            <Image src={groundingImage4} alt="taste" />
            <Image src={groundingImage5} alt="touch" />
            <Image src={groundingImage6} alt="change position" />
          </div>
        </div>
      </div>
    </div>
  )
}
