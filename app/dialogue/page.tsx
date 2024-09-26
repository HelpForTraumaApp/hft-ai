import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { Dialogue } from '@/components/dialogue/dialogue'
import { redirect } from 'next/navigation'

export default async function DialoguePage() {
  const session = (await auth()) as Session
  if (!session) {
    redirect('/')
  }

  return <Dialogue />
}
