// components/section.tsx

import React from 'react'

interface SectionProps {
  title: string
  children: React.ReactNode
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">{title}</h2>
        <div className="text-gray-700 space-y-4">
          {children}
        </div>
      </div>
    </section>
  )
}
