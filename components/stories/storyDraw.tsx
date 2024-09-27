'use client'

import Excalidraw from '../excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { useEffect, useState } from 'react'
import { PathMapCarousel } from '../carousel/carousel'
import { exportToCanvas } from '@excalidraw/excalidraw'
import { ExcalidrawContent } from '../partMap/partMap'
import { EventInfo } from './stories'

interface StoryDrawProps {
  id: string
}

export const StoryDraw = ({ id }: StoryDrawProps) => {
  const [sceneName, setSceneName] = useState('')
  const [contents, setContents] = useState<ExcalidrawContent[]>([])
  const [elements, setElements] = useState<ExcalidrawElement[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [eventList, setEventList] = useState<EventInfo[]>([])

  useEffect(() => {
    const loadContents = async () => {
      const savedData: EventInfo[] = JSON.parse(
        localStorage.getItem('stories') || '[]'
      )

      if (!Array.isArray(savedData) || savedData.length < Number(id) + 1) return

      setEventList(savedData)

      const curItem = savedData[Number(id)]
      const excalidrawContentList = curItem.excalidrawContentList || []

      if (excalidrawContentList.length == 0) {
        excalidrawContentList.push({
          title: '',
          image: await getImageFromElements(initialSceneData),
          elements: initialSceneData
        })
      }

      setContents(excalidrawContentList)
      setSelectedIndex(0)
    }

    loadContents()
  }, [id])

  useEffect(() => {
    if (contents && contents.length > selectedIndex) {
      setElements(contents[selectedIndex].elements)
      setSceneName(contents[selectedIndex].title)
    }
  }, [contents, selectedIndex])

  const initialSceneData: ExcalidrawElement[] = []

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

    const newEventList = [...eventList]
    eventList[Number(id)].excalidrawContentList = contentList
    setEventList(newEventList)

    localStorage.setItem('stories', JSON.stringify(newEventList))
  }

  const handleSaveScene = async (
    elements: ExcalidrawElement[],
    name: string
  ) => {
    const contentList = [...contents]
    contentList[selectedIndex].elements = elements
    contentList[selectedIndex].title = name
    contentList[selectedIndex].image = await getImageFromElements(elements)

    const newEventList = [...eventList]
    eventList[Number(id)].excalidrawContentList = contentList
    setEventList(newEventList)

    localStorage.setItem('stories', JSON.stringify(newEventList))
  }

  const handleDeleteScene = async (index: number) => {
    const contentList = [...contents]
    contentList.splice(index, 1)

    setContents(contentList)

    const newEventList = [...eventList]
    eventList[Number(id)].excalidrawContentList = contentList
    setEventList(newEventList)

    localStorage.setItem('stories', JSON.stringify(newEventList))

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
