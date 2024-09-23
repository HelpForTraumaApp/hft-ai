import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { Dashboard } from '@/components/dashboard/dashboard'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = (await auth()) as Session

  if (!session) {
    redirect('/')
  }

  return <Dashboard />
}
