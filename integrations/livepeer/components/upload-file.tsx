import { useCallback, useEffect, useMemo, useState } from 'react'

import { useCreateAsset } from '@livepeer/react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { BiVideoPlus } from 'react-icons/bi'

import { Progress } from '@/components/ui/progress'

export function UploadFile() {
  const route = useRouter()
  const [video, setVideo] = useState<File | undefined>()
  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null
  )

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['*.mp4'],
    },
    maxFiles: 1,
    onDrop,
  })

  const isLoading = useMemo(() => status === 'loading' || (asset?.[0] && asset[0].status?.phase !== 'ready'), [status, asset])

  const totalProgress = useMemo(
    () =>
      progress?.[0].phase === 'uploading'
        ? Math.round((progress?.[0]?.progress * 100) / 2)
        : progress?.[0].phase === 'processing'
        ? Math.round((progress?.[0].progress * 100) / 2 + 50)
        : 0,
    [progress]
  )

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting...'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${totalProgress}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${totalProgress}%`
        : null,
    [progress]
  )

  useEffect(() => {
    if (asset?.[0]) {
      route.push(`/integration/livepeer/video/${asset[0].id}`)
    }
  }, [asset])

  return (
    <div className="flex h-full w-full flex-col gap-y-4">
      {!asset && !video ? (
        <div>
          <div
            {...getRootProps()}
            className="relative flex w-full flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-aquaGreen-300 focus:ring-offset-2">
            <input {...getInputProps()} />

            <BiVideoPlus fill="rgb(226 232 240)" size={108} />
            <span className="mt-2 block text-sm font-semibold text-gray-400">Drop a video to upload</span>
          </div>
          {error?.message && <p>{error.message}</p>}
        </div>
      ) : (
        <div>
          <div className="relative flex w-full flex-col items-center gap-y-4 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-aquaGreen-300 focus:ring-offset-2">
            {video && <p>{video.name}</p>}
            {progress && totalProgress > 0 && totalProgress < 100 && <Progress value={totalProgress} />}
            {progressFormatted && <p>{progressFormatted}</p>}
          </div>
        </div>
      )}

      {!asset?.[0].id && (
        <button
          className="btn btn-aquaGreen"
          disabled={isLoading || !createAsset}
          onClick={() => {
            createAsset?.()
          }}>
          {isLoading ? 'Uploading...' : 'Upload Video'}
        </button>
      )}
    </div>
  )
}