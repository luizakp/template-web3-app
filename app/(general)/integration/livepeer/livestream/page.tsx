'use client'

import { useState } from 'react'

import { LinkComponent } from '@/components/shared/link-component'

export default function PageIntegration() {
  const newStreamPath = '/integration/livepeer/livestream/new'
  const watchStreamPath = '/integration/livepeer/livestream/watch'

  const [isLoadingNewStream, setIsLoadingNewStream] = useState<boolean>(false)
  const [isLoadingExistingStream, setIsLoadingExistingStream] = useState<boolean>(false)

  return (
    <div className="card">
      <LinkComponent href={newStreamPath}>
        <button className="btn btn-emerald mt-4 w-full" onClick={() => setIsLoadingNewStream(true)}>
          {isLoadingNewStream ? 'Loading...' : 'Create a new livestream'}
        </button>
      </LinkComponent>
      <LinkComponent href={watchStreamPath}>
        <button className="btn btn-emerald mt-4 w-full" onClick={() => setIsLoadingExistingStream(true)}>
          {isLoadingExistingStream ? 'Loading...' : 'Watch an existing livestream'}
        </button>
      </LinkComponent>
    </div>
  )
}
