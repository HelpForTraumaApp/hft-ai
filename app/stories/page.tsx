import { auth } from '@/auth'
import { Stories } from '@/components/stories/stories'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function StoriesPage() {
  const session = (await auth()) as Session

  if (!session) {
    redirect('/')
  }
  return <Stories />
}
