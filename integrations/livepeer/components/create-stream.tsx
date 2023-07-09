'use client'

import { useMemo, useState } from 'react'

import { useCreateStream } from '@livepeer/react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useForm } from 'react-hook-form'
import { BiInfoCircle } from 'react-icons/bi'
import { FaCopy } from 'react-icons/fa'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { FormLivepeerApiKey } from './form-livepeer-api-key'
import { PlayerComponent, PlayerType } from './player'
import { useIsLivepeerApiKeySet } from '../hooks/use-livepeer-api-key'

interface createStreamForm {
  streamName: string
}

export const CreateStream = () => {
  const [streamName, setStreamName] = useState<string>('')
  const { register, handleSubmit } = useForm<createStreamForm>()
  const { mutate: createStream, data: streamData, status } = useCreateStream(streamName ? { name: streamName } : null)
  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()

  const OBS_URL = 'https://obsproject.com/'
  const streamIdTooltip = 'This is your Stream ID. You can copy and use to watch on the player'

  const isLoading = useMemo(() => status === 'loading', [status])

  function onSubmit() {
    createStream?.()
  }

  const streamRtpmIngestUrl = 'rtmp://rtmp.livepeer.com/live'

  return (
    <div>
      {!isLivepeerApiKeySet ? (
        <div className="card">
          <FormLivepeerApiKey />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          <div className="card w-full">
            {!streamData && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>Stream Name</label>
                <input
                  required
                  className="input mt-4"
                  {...register('streamName')}
                  value={streamName}
                  onChange={(e) => setStreamName(e.target.value)}
                />
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
                  <a
                    className="font-semibold underline decoration-yellow-200 underline-offset-2"
                    href={OBS_URL}
                    rel="noopener noreferrer"
                    target="_blank">
                    OBS
                  </a>{' '}
                  by following the steps below:
                </span>
                <ol className="list-inside list-decimal">
                  <li>Open OBS</li>
                  <li>
                    Go to <span className="font-semibold">Settings</span>
                  </li>
                  <li>
                    Go to <span className="font-semibold">Stream</span>
                  </li>
                  <li>
                    Set Service to <span className="font-semibold">Custom...</span>
                  </li>
                  <li>
                    Set <span className="font-semibold">Server</span> to RTMP Ingest URL provided below
                  </li>
                  <li>
                    Set <span className="font-semibold">Stream Key</span> to the Stream Key provided below
                  </li>
                  <li>
                    Click <span className="font-semibold">Apply</span> and then <span className="font-semibold">OK</span>
                  </li>
                  <li>
                    Click <span className="font-semibold">Start Streaming</span>
                  </li>
                </ol>
                <span>
                  With this proccess, you will be able to stream whatever is set as <span className="font-semibold">Sources</span> on your OBS
                </span>
              </div>
            )}
          </div>
          {streamData && (
            <div className="card w-full selection:bg-yellow-200">
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
                  <div className="flex items-center gap-x-2">
                    <label>Stream ID</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <BiInfoCircle />
                      </TooltipTrigger>
                      <TooltipContent>{streamIdTooltip}</TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex">
                    <input className="input mt-4" value={streamData.id} />
                    <CopyToClipboard text={streamData.id}>
                      <span className="flex-center flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                        <FaCopy className=" text-neutral-600 dark:text-neutral-100" />
                      </span>
                    </CopyToClipboard>
                  </div>
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
      )}
    </div>
  )
}
