import { useEffect, useState } from 'react'
import { tokenManager } from './tokenManager'
import { refreshAccessToken } from './refreshQueue'

export function useAuthReady() {
  const [ready, setReady] = useState(!!tokenManager.get()) // если токен уже есть — сразу ready

  useEffect(() => {
    if (tokenManager.get()) return // токен уже есть, ничего не делаем

    // токена нет — запускаем refresh (если уже идёт — вернёт тот же промис)
    refreshAccessToken()
      .then(() => setReady(true))
      .catch(() => setReady(false)) // не авторизован
  }, [])

  return ready
}
