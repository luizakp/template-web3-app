'use client'

import { VideoOnDemand } from '@/integrations/livepeer/components/video-on-demand'

export default function PageIntegration() {
  return (
    <div className="h-full w-full">
      <VideoOnDemand />
    </div>
  )
}
