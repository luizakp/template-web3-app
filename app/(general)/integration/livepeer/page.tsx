'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { Spinner } from '@/integrations/livepeer/components/spinner'

export default function PageIntegration() {
  const route = useRouter()
  useEffect(() => {
    route.push('/integration/livepeer/vod')
  }, [])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  )
}
