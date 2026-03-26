type Listener = (token: string | null) => void

let accessToken: string | null = null
const listeners = new Set<Listener>()

export const tokenManager = {
  get() {
    return accessToken
  },

  set(token: string) {
    accessToken = token
    listeners.forEach(l => l(token))
  },

  clear() {
    accessToken = null
    listeners.forEach(l => l(null))
  },

  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}
