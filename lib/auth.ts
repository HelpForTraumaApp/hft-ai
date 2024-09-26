// Authentication
import { auth } from '@/auth'
import { Session } from '@/lib/types'

export const getAuth = async () => {
    const session = (await auth()) as Session
    if (session) {
        return session.user.id;
    } else{
        return null;
    }
}
