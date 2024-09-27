'use client'

import Excalidraw from '../excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { useEffect, useState } from 'react'
import { PathMapCarousel } from '../carousel/carousel'
import { exportToCanvas } from '@excalidraw/excalidraw'
import { isExcalidrawElement } from '@excalidraw/excalidraw/types/element'

export type ExcalidrawContent = {
  title: string
  image: string
  elements: ExcalidrawElement[]
}

export const PartMap = () => {
  const [sceneName, setSceneName] = useState('')
  const [contents, setContents] = useState<ExcalidrawContent[]>([])
  const [elements, setElements] = useState<ExcalidrawElement[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const loadContents = async () => {
      const savedData = JSON.parse(
        localStorage.getItem('excaliDrawPartsMap') || '[]'
      )

      if (savedData.length == 0) {
        savedData.push({
          title: '',
          image: await getImageFromElements(initialSceneData),
          elements: initialSceneData
        })
      }

      setContents(savedData)
      setSelectedIndex(0)
    }

    loadContents()
  }, [])

  useEffect(() => {
    if (contents && contents.length > selectedIndex) {
      setElements(contents[selectedIndex].elements)
      setSceneName(contents[selectedIndex].title)
    }
  }, [contents, selectedIndex])

  const initialSceneData: ExcalidrawElement[] = [
    {
      angle: 0,
      backgroundColor: 'transparent',
      boundElements: null,
      fillStyle: 'solid',
      frameId: null,
      groupIds: [],
      height: 358.1817932128906,
      id: '14KsfXb3syOboCC6kUCNj',
      isDeleted: false,
      link: null,
      locked: false,
      opacity: 100,
      roughness: 1,
      roundness: { type: 2 },
      seed: 1507331948,
      strokeColor: '#1e1e1e',
      strokeStyle: 'solid',
      strokeWidth: 2,
      type: 'ellipse',
      updated: 1727248693439,
      version: 101,
      versionNonce: 2065019732,
      width: 358.1817932128906,
      x: 333.6363525390625,
      y: 250.55399322509766
    }
  ]

  const getImageFromElements = async (elements: ExcalidrawElement[]) => {
    const canvas = await exportToCanvas({
      elements: elements,
      appState: {
        viewBackgroundColor: '#f8f9fa',
        currentItemFontFamily: 1
      },
      files: null
    })

    return canvas.toDataURL()
  }

  const handleAddScene = async () => {
    const contentList = [
      ...contents,
      {
        title: '',
        image: await getImageFromElements(initialSceneData),
        elements: initialSceneData
      }
    ]

    setContents(contentList)
    setSelectedIndex(contentList.length - 1)

    localStorage.setItem('excaliDrawPartsMap', JSON.stringify(contentList))
  }

  const handleSaveScene = async (
    elements: ExcalidrawElement[],
    name: string
  ) => {
    const contentList = [...contents]
    contentList[selectedIndex].elements = elements
    contentList[selectedIndex].title = name
    contentList[selectedIndex].image = await getImageFromElements(elements)

    localStorage.setItem('excaliDrawPartsMap', JSON.stringify(contentList))
  }

  const handleDeleteScene = async (index: number) => {
    const contentList = [...contents]
    contentList.splice(index, 1)

    setContents(contentList)
    localStorage.setItem('excaliDrawPartsMap', JSON.stringify(contentList))

    if (index >= contentList.length) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  return (
    <div>
      <PathMapCarousel
        contentList={contents}
        handleAddScene={handleAddScene}
        handleSelect={setSelectedIndex}
        handleDeleteScene={handleDeleteScene}
      />
      <Excalidraw
        elements={elements}
        handleSaveScene={handleSaveScene}
        sceneName={sceneName}
        top={248}
      />
    </div>
  )
}
