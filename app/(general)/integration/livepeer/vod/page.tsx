'use client'

import { useState } from 'react'

import { LinkComponent } from '@/components/shared/link-component'

export default function PageIntegration() {
  const newVodPath = '/integration/livepeer/vod/new'
  const watchVodPath = '/integration/livepeer/vod/watch'

  const [isLoadingNewVideo, setIsLoadingNewVideo] = useState<boolean>(false)
  const [isLoadingExistingVideo, setIsLoadingExistingVideo] = useState<boolean>(false)

  return (
    <div className="card">
      <LinkComponent href={newVodPath}>
        <button className="btn btn-emerald mt-4 w-full" onClick={() => setIsLoadingNewVideo(true)}>
          {isLoadingNewVideo ? 'Loading...' : 'Upload a new video'}
        </button>
      </LinkComponent>
      <LinkComponent href={watchVodPath}>
        <button className="btn btn-emerald mt-4 w-full" onClick={() => setIsLoadingExistingVideo(true)}>
          {isLoadingExistingVideo ? 'Loading...' : 'Watch an existing video'}
        </button>
      </LinkComponent>
    </div>
  )
}
