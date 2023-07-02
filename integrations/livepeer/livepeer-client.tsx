import { createReactClient, studioProvider } from '@livepeer/react'

import { env } from '@/env.mjs'

if (!env.NEXT_PUBLIC_LIVEPEER_API_KEY) {
  throw new Error('No NEXT_PUBLIC_LIVEPEER_API_KEY provided')
}

export const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY as string,
  }),
})
