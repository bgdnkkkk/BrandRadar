import createClient from 'openapi-fetch'

// @ts-expect-error 'сгенерить типы по сваггеру и импортнуть paths'
export const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
})

export type ApiClient = typeof client
