import { tokenManager } from './tokenManager'
import { ENDPOINTS } from '@/common/constants/endpoints'

let refreshPromise: Promise<string> | null = null

export async function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/${ENDPOINTS.refreshToken}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) {
          tokenManager.clear()
          throw new Error('refresh failed')
        }

        const data = await res.json()

        tokenManager.set(data.accessToken)

        return data.accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}
