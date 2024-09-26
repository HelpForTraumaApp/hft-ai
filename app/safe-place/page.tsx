import { auth } from '@/auth'
import { SafePlace } from '@/components/safePlace/safePlace'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function SafePlacePage() {
  const session = (await auth()) as Session

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <SafePlace />
    </div>
  )
}
