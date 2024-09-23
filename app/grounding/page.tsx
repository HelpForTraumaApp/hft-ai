import { auth } from '@/auth'
import { Grounding } from '@/components/grounding/Grounding'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function GroundingPage() {
  const session = (await auth()) as Session

  if (!session) {
    redirect('/')
  }

  return <Grounding />
}
