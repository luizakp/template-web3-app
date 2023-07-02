'use client'

import { VideoOnDemand } from '@/integrations/livepeer/components/video-on-demand'

export default function PageIntegration() {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="w-7/12">
        <VideoOnDemand />
      </div>
    </div>
  )
}
