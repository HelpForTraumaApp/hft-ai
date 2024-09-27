import { auth } from '@/auth'
import { StoryDraw } from '@/components/stories/storyDraw'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export interface PageProps {
  params: {
    id: string
  }
}

export default async function StoriesExcalidrawPage({ params }: PageProps) {
  const session = (await auth()) as Session

  if (!session) {
    redirect('/')
  }

  return <StoryDraw id={params.id} />
}
