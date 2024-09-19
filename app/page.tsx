import { auth } from '@/auth'
import { HomePage } from '@/components/homepage'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect('/chat')
  }

  return <HomePage />
}
