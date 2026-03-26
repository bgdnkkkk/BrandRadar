import { PropsWithChildren } from 'react'
import { unauthorized } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function PrivateLayout({ children }: PropsWithChildren) {
  const cookieStore = cookies()

  const cookie = await cookieStore
  // if (!cookie.get('refreshToken')) unauthorized()

  return <main>{children}</main>
}
