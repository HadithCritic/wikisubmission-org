import createClient from 'openapi-fetch'
import type { paths } from './types.gen'

export const wsApi = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
})
