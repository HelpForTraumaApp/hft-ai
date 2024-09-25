'use client'

import { useEffect, useState } from 'react'
import Excalidraw from '../excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'

export const SafePlace = () => {
  const [sceneName, setSceneName] = useState('')
  const [elements, setElements] = useState<ExcalidrawElement[]>([])

  useEffect(() => {
    const openScene = () => {
      const savedData = JSON.parse(
        localStorage.getItem('excaliDrawSafePlace') || '{}'
      )
      if (savedData.scenedata) {
        setElements(savedData.scenedata.elements)
      }

      if (savedData.name) {
        setSceneName(savedData.name)
      }
    }

    openScene()
  }, [])

  const handleSaveScene = (elements: ExcalidrawElement[], name: string) => {
    const sceneData: any = {
      scenedata: { elements },
      name
    }

    localStorage.setItem('excaliDrawSafePlace', JSON.stringify(sceneData))
  }

  return (
    <div className="relative h-[calc(100vh-105px)]">
      <Excalidraw
        elements={elements}
        handleSaveScene={handleSaveScene}
        sceneName={sceneName}
        top={105}
      />
    </div>
  )
}
