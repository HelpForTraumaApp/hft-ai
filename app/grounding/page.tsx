
"use client";

import React from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player';

//images
import groundingImage1 from '@/app/assets/grounding/1-1.png';
import groundingImage2 from '@/app/assets/grounding/1-2.png';
import groundingImage3 from '@/app/assets/grounding/2-1.png';
import groundingImage4 from '@/app/assets/grounding/2-2.png';
import groundingImage5 from '@/app/assets/grounding/3-1.png';
import groundingImage6 from '@/app/assets/grounding/3-2.png';

export default function GroundingPage() {


  const video_url = "https://vimeo.com/417307026";

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-300 text-center">Grounding</div>
      <div className="grid 2xl:grid-cols-2 gap-10 m-10">
        <div>
          <ReactPlayer
            url={video_url}
            controls
            width={500}
            height={280}
          />
        </div>
        <div className="flex flex-col gap-10 p-4 bg-white ">
          <div className=" text-[#523d78] uppercase text-xl font-extrabold">
            grounding:getting reconnected
          </div>
          <div className="text-base">
            <p>
              Grounding refers to a state of mental awareness in which a person is fully present is fully
              in the here and now and has access to "logical" brain functions. Grounding techniques can
              help improve logical thinking, restore balance, and serve as effective distractions from
              uncomfortable sensations and emotional states like anxiety, anger, sadness, fear, or self-harm
              tendencies.
            </p>
          </div>
          <div className='grid grid-cols-2'>
            <Image
              src={groundingImage1}
              alt="Description of the image"
              width={450}   // width of the image
              height={320}  // height of the image
            />
            <Image
              src={groundingImage2}
              alt="Description of the image"
              width={450}   // width of the image
              height={320}  // height of the image
            />
            <Image
              src={groundingImage3}
              alt="Description of the image"
              width={450}   // width of the image
              height={320}  // height of the image
            />
            <Image
              src={groundingImage4}
              alt="Description of the image"
              width={450}   // width of the image
              height={320}  // height of the image
            />
            <Image
              src={groundingImage5}
              alt="Description of the image"
              width={450}   // width of the image
              height={320}  // height of the image
            />
            <Image
              src={groundingImage6}
              alt="Description of the image"
              width={450}   // width of the image
              height={320}  // height of the image
            />
          </div>
        </div>
      </div>
    </div>
  )
}
