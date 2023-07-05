'use client'

import { useAsset } from '@livepeer/react'

import { PlayerComponent, PlayerType } from '@/integrations/livepeer/components/player'
import { Spinner } from '@/integrations/livepeer/components/spinner'

export default function Page({ params }: { params: { assetId: string } }) {
  const { data: asset } = useAsset({
    assetId: params.assetId,
  })
  if (!asset || !asset.playbackId)
    return (
      <div className="flex w-full flex-1 items-center justify-center py-20">
        <Spinner />
      </div>
    )

  return <PlayerComponent containerBorderRadius="16px" playbackId={asset.playbackId} title={asset.name} type={PlayerType.FILE} />
}
