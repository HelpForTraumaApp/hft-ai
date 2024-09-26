import { nanoid } from '@/lib/utils'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { redirect } from 'next/navigation'
import Excalidraw from '@/components/excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  if (!session) {
    redirect('/')
  }

  return (
    <Excalidraw
      elements={[]}
      handleSaveScene={(elements: ExcalidrawElement[], name: string) => {}}
      sceneName={''}
      top={0}
    />
  )
}
