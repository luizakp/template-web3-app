'use client'

import { useRouter } from 'next/navigation'

export default function PageIntegration() {
  const route = useRouter()

  function handleWatchExistingLivestream() {
    route.push('/integration/livepeer/livestream/watch')
  }
  function handleCreateNewLivestream() {
    route.push('/integration/livepeer/livestream/new')
  }

  return (
    <div className="card">
      <button className="btn btn-emerald mt-4 w-full" onClick={handleCreateNewLivestream}>
        Create a new livestream
      </button>
      <button className="btn btn-emerald mt-4 w-full" onClick={handleWatchExistingLivestream}>
        Watch an existing livestream
      </button>
    </div>
  )
}
