// app/page.tsx

import Link from 'next/link'
import React from 'react'
import Section from '@/components/section' // Adjust the path if necessary


export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 px-4">
      <h1 className="text-6xl font-extrabold text-white text-center">Welcome to Help for Trauma</h1>
      <div className="mt-4 w-full overflow-x-auto flex justify-center">
        <p className="text-2xl sm:text-3xl md:text-4xl text-white text-center whitespace-nowrap">
          Full Recovery From Any Type of Trauma using the Instinctual Trauma Response (ITR)® and AI
        </p>
      </div>
      <div className="mt-8 flex space-x-4">
        <Link href="/chat" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100">
          Learn More
        </Link>
        <Link href="/signup" className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600">
          Sign Up
        </Link>
      </div>
    </div>
  )
}

