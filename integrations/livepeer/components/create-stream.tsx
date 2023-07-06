'use client'

import { useMemo, useState } from 'react'

import { useCreateStream } from '@livepeer/react'
import { useForm } from 'react-hook-form'

import { PlayerComponent, PlayerType } from './player'

interface createStreamForm {
  streamName: string
}

export const CreateStream = () => {
  const [streamName, setStreamName] = useState<string>('')
  const { register, handleSubmit } = useForm<createStreamForm>()
  const { mutate: createStream, data: streamData, status } = useCreateStream(streamName ? { name: streamName } : null)

  const OBS_URL = 'https://obsproject.com/'

  const isLoading = useMemo(() => status === 'loading', [status])

  function onSubmit() {
    createStream?.()
  }

  const streamRtpmIngestUrl = 'rtmp://rtmp.livepeer.com/live'

  return (
    <div className="flex flex-col gap-y-4">
      <div className="card w-full">
        {!streamData && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Stream Name</label>
            <input required className="input mt-4" {...register('streamName')} value={streamName} onChange={(e) => setStreamName(e.target.value)} />
            <button className="btn btn-emerald mt-4 w-full" disabled={!streamName || isLoading} type="submit">
              {isLoading ? 'Loading...' : 'Create Stream'}
            </button>
          </form>
        )}
        {streamData && (
          <div className="flex flex-col gap-y-3">
            <h2 className="text-center text-xl font-bold text-yellow-200">Your stream was succesfuly created!</h2>
            <span>
              To make the stream active, you must configure your{' '}
              <a className="underline underline-offset-2" href={OBS_URL} rel="noopener noreferrer" target="_blank">
                OBS
              </a>{' '}
              by following the steps below:
            </span>
            <ol className="list-inside list-decimal">
              <li>Open OBS</li>
              <li>Go to Settings</li>
              <li>Go to Stream</li>
              <li>
                Set Service to <span className="font-semibold">Custom...</span>
              </li>
              <li>
                Set <span className="font-semibold">Server</span> to RTMP Ingest URL provided below
              </li>
              <li>
                Set <span className="font-semibold">Stream Key</span> to the Stream Key provided below
              </li>
              <li>Click Apply and then OK</li>
              <li>Click Start Streaming</li>
            </ol>
            <span>
              With this proccess, you will be able to stream whatever is set as <span className="font-semibold">Sources</span> on your OBS
            </span>
          </div>
        )}
      </div>
      {streamData && (
        <div className="card w-full">
          <div className="flex flex-col gap-y-4">
            <div>
              <label>RTMP Ingest URL</label>
              <input className="input mt-4" value={streamRtpmIngestUrl} />
            </div>
            <div>
              <label>Stream Key</label>
              <input className="input mt-4" value={streamData?.streamKey} />
            </div>
            <div>
              <label>Stream ID</label>
              <input className="input mt-4" value={streamData.id} />
            </div>
          </div>
        </div>
      )}

      {streamData && (
        <div className="mt-4">
          <PlayerComponent
            autoPlay={true}
            containerBorderRadius="16px"
            playbackId={streamData.playbackId}
            title={streamName}
            type={PlayerType.STREAM}
          />
        </div>
      )}
    </div>
  )
}
