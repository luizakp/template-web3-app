'use client'

import { useState } from 'react'

import { LinkComponent } from '@/components/shared/link-component'
import { FormLivepeerApiKey } from '@/integrations/livepeer/components/form-livepeer-api-key'
import { useIsLivepeerApiKeySet, useLivepeerApiKey } from '@/integrations/livepeer/hooks/use-livepeer-api-key'

export default function PageIntegration() {
  const newStreamPath = '/integration/livepeer/livestream/new'
  const watchStreamPath = '/integration/livepeer/livestream/watch'

  const [isLoadingNewStream, setIsLoadingNewStream] = useState<boolean>(false)
  const [isLoadingExistingStream, setIsLoadingExistingStream] = useState<boolean>(false)
  const isLivepeerApiKeySet = useIsLivepeerApiKeySet()
  const [, setLivepeerApiKey] = useLivepeerApiKey()

  return (
    <div className="card">
      {!isLivepeerApiKeySet && <FormLivepeerApiKey setCustomApiKey={setLivepeerApiKey} />}
      <LinkComponent href={newStreamPath}>
        <button className="btn btn-emerald mt-4 w-full" disabled={!isLivepeerApiKeySet} onClick={() => setIsLoadingNewStream(true)}>
          {isLoadingNewStream ? 'Loading...' : 'Create a new livestream'}
        </button>
      </LinkComponent>
      <LinkComponent href={watchStreamPath}>
        <button className="btn btn-emerald mt-4 w-full" disabled={!isLivepeerApiKeySet} onClick={() => setIsLoadingExistingStream(true)}>
          {isLoadingExistingStream ? 'Loading...' : 'Watch an existing livestream'}
        </button>
      </LinkComponent>
    </div>
  )
}
