import { Middleware } from 'openapi-fetch'
import { tokenManager } from './tokenManager'
import { refreshAccessToken } from './refreshQueue'

export const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const token = tokenManager.get()

    if (token) request.headers.set('Authorization', `Bearer ${token}`)

    return request
  },
}

export const refreshMiddleware: Middleware = {
  async onResponse({ request, response }) {
    if (response.status !== 401) return response

    try {
      const newToken = await refreshAccessToken()

      const retryRequest = new Request(request, {
        headers: {
          ...Object.fromEntries(request.headers),
          Authorization: `Bearer ${newToken}`,
        },
      })

      return fetch(retryRequest)
    } catch {
      return response
    }
  },
}
