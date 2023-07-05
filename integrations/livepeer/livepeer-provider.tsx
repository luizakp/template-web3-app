import { ReactNode } from 'react'

import { LivepeerConfig, ThemeConfig } from '@livepeer/react'

import { livepeerClient } from './livepeer-client'

const livepeerTheme: ThemeConfig = {
  colors: {
    accent: '#00eb87',
    containerBorderColor: '#00eb87',
  },
  fonts: {
    display: 'Inter',
  },
}

export function LivepeerProvider({ children }: { children: ReactNode }) {
  return (
    <LivepeerConfig client={livepeerClient} theme={livepeerTheme}>
      {children}
    </LivepeerConfig>
  )
}
