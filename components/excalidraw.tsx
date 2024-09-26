'use client'

import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { exportToBlob } from '@excalidraw/excalidraw'
const ExcalidrawPrimitive = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false
  }
)

interface ExcalidrawProps {
  elements: ExcalidrawElement[]
  sceneName: string
  top?: number
  handleSaveScene: (elements: ExcalidrawElement[], name: string) => void
}

const Excalidraw = ({
  elements,
  handleSaveScene,
  sceneName,
  top = 0
}: ExcalidrawProps) => {
  const [api, setAPI] = useState<ExcalidrawImperativeAPI | null>(null)
  const [inputName, setInputName] = useState(sceneName)

  useEffect(() => {
    setInputName(sceneName)
  }, [sceneName])

  useEffect(() => {
    api?.updateScene({
      elements,
      appState: {
        viewBackgroundColor: '#f8f9fa',
        currentItemFontFamily: 1
      }
    })
  }, [elements])

  const saveElements = () => {
    if (!api) return

    const sceneElements = api.getSceneElementsIncludingDeleted()
    handleSaveScene([...sceneElements], inputName)
  }

  const handleExportToImage = async () => {
    if (!api) {
      return
    }
    const blob = await exportToBlob({
      elements: api?.getSceneElements(),
      mimeType: 'image/png',
      appState: {
        viewBackgroundColor: '#f8f9fa',
        currentItemFontFamily: 1,
        exportEmbedScene: false,
        exportWithDarkMode: false
      },
      files: api?.getFiles()
    })

    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'drawing'
    a.click()
  }

  return (
    <div
      className={`relative bg-white`}
      style={{ height: `calc(100vh - ${top}px)` }}
    >
      <ExcalidrawPrimitive
        excalidrawAPI={api => setAPI(api)}
        initialData={{
          elements,
          appState: {
            viewBackgroundColor: '#f8f9fa',
            currentItemFontFamily: 1
          },
          scrollToContent: true
        }}
        renderTopRightUI={() => {
          return (
            <>
              <button
                className="bg-[#f8f9fa] py-2 px-4 rounded-md hover:bg-[#e2e6ea] duration-200"
                onClick={() => saveElements()}
              >
                Save
              </button>
              <button
                className="bg-[#f8f9fa] py-2 px-4 rounded-md hover:bg-[#e2e6ea] duration-200"
                onClick={handleExportToImage}
              >
                Export
              </button>
            </>
          )
        }}
      />
      <div className="flex justify-center items-center">
        <label>Name: </label>
        <input
          value={inputName}
          className="border-[2px] h-8 ml-2"
          type="text"
          onChange={e => setInputName(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Excalidraw
