import { useState } from 'react'

import { Asset } from '@livepeer/react'

import { PlayerComponent, PlayerType } from './player'
import { UploadFile } from './upload-file'

export const VideoOnDemand = () => {
  const [asset, setAsset] = useState<Asset>({} as Asset)

  function changeAsset(newAsset: Asset) {
    setAsset(newAsset)
  }

  return (
    <>
      {asset.playbackId ? (
        <PlayerComponent containerBorderRadius="16px" playbackId={asset.playbackId} title={asset.name} type={PlayerType.FILE} />
      ) : (
        <UploadFile changeAsset={changeAsset} />
      )}
    </>
  )
}
