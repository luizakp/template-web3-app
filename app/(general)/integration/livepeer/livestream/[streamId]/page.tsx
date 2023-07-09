'use client'

import { useStream } from '@livepeer/react'

import { LinkComponent } from '@/components/shared/link-component'
import { FormLivepeerApiKey } from '@/integrations/livepeer/components/form-livepeer-api-key'
import { PlayerComponent, PlayerType } from '@/integrations/livepeer/components/player'
import { Spinner } from '@/integrations/livepeer/components/spinner'
import { useIsLivepeerApiKeySet, useLivepeerApiKey } from '@/integrations/livepeer/hooks/use-livepeer-api-key'

export default function Page({ params }: { params: { streamId: string } }) {
  const watchStreamPath = '/integration/livepeer/livestream/watch'

  const { data: stream, error } = useStream({
    streamId: params.streamId,
  })
  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()
  const [, setLivepeerApiKey] = useLivepeerApiKey()

  if (error) {
    return (
      <div className="mt-20 flex w-full flex-col items-center justify-center">
        {!isLivepeerApiKeySet ? (
          <div className="card">
            <FormLivepeerApiKey setCustomApiKey={setLivepeerApiKey} />
          </div>
        ) : (
          <>
            <h1 className="text-center">We are sorry, but your livestream was not found &#128531; {/* &#128531; = 😓 */}</h1>
            <h1>
              Please try again{' '}
              <LinkComponent href={watchStreamPath}>
                <span className="underline underline-offset-2">here</span>
              </LinkComponent>
            </h1>
          </>
        )}
      </div>
    )
  }

  if (!stream || !stream.playbackId)
    return (
      <div className="flex w-full items-center justify-center py-20">
        <Spinner />
      </div>
    )

  return <PlayerComponent autoPlay={true} containerBorderRadius="16px" playbackId={stream.playbackId} title={stream.name} type={PlayerType.STREAM} />
}
