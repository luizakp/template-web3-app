'use client'

import { useRouter } from 'next/navigation'

export default function PageIntegration() {
  const route = useRouter()

  function handleWatchExistingVideo() {
    route.push('/integration/livepeer/vod/watch')
  }
  function handleUploadNewVideo() {
    route.push('/integration/livepeer/vod/new')
  }

  return (
    <div className="card">
      <button className="btn btn-emerald mt-4 w-full" onClick={handleUploadNewVideo}>
        Upload a new video
      </button>
      <button className="btn btn-emerald mt-4 w-full" onClick={handleWatchExistingVideo}>
        Watch an existing video
      </button>
    </div>
  )
}
