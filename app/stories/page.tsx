import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function StoriesPage() {
  const session = (await auth()) as Session

  if (!session) {
    redirect('/')
  }

  return <div className="bg-gray-300 text-center">Stories page</div>
}
