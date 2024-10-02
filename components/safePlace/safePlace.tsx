'use client'

import { useEffect, useState } from 'react'
import Excalidraw from '../excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'

export const SafePlace = () => {
  const [sceneName, setSceneName] = useState('')
  const [elements, setElements] = useState<ExcalidrawElement[]>([])
  const [prevElements, setPrevElements] = useState<ExcalidrawElement[]>([])

  useEffect(() => {
    const openScene = async () => {
      let data;
      try {
        const response = await fetch('/api/place');
        if (!response.ok) {
          throw new Error('Failed to fetch initial scene data');
        }
        data = await response.json();
        // Process data if needed
      } catch (error) {
        console.error('Error fetching initial scene data:', error);
      }
      const savedData = data.result[0]
      if (savedData.scene_data) {
        setElements([...savedData.scene_data.elements])
        setPrevElements([...savedData.scene_data.elements]) // Initialize prevElements
        setSceneName(savedData.scene_data.name)
      }
    }

    openScene()
  }, [])

  const handleSaveScene = async (elements: ExcalidrawElement[], name: string) => {
    const sceneData: any = {
      scenedata: { elements },
      name
    }

    if (prevElements.length === 0 && elements.length > 0) {
      // Send POST request
      try {
        const response = await fetch('/api/place', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ elements, name }),
        });

        if (!response.ok) {
          throw new Error('Failed to save scene to database');
        }

        const data = await response.json();
        console.log('Scene saved to database:', data);
        setPrevElements(elements); // Update prevElements
      } catch (error) {
        console.error('Error saving scene:', error);
      }
    } else if (prevElements.length > 0 && JSON.stringify(prevElements) !== JSON.stringify(elements)) {
      // Send PUT request
      try {
        const response = await fetch('/api/place', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ elements, name }),
        });

        if (!response.ok) {
          throw new Error('Failed to update scene to database');
        }

        const data = await response.json();
        console.log('Scene updated to database:', data);
        setPrevElements(elements); // Update prevElements
      } catch (error) {
        console.error('Error updating scene:', error);
      }
    }
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
