'use client'
import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Balancer from 'react-wrap-balancer'

import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { LivepeerProvider } from '@/integrations/livepeer/livepeer-provider'
import { cn } from '@/lib/utils'

const videoOnDemandPath = '/integration/livepeer/video-on-demand'
const livestreamPath = '/integration/livepeer/livestream'
const watchVideoPath = '/integration/livepeer/video'

export default function LayoutIntegration({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <LivepeerProvider>
      <motion.div
        animate="show"
        className="h-full w-full"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}>
        <div className="flex-center flex flex-1 flex-col items-center justify-center">
          <div className="max-w-screen-xl px-5 text-center xl:px-0">
            <motion.h1
              className="text-gradient-sand my-4 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              {turboIntegrations.livepeer.name}
            </motion.h1>
            <motion.p className="my-4 text-lg" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>{turboIntegrations.livepeer.description}</Balancer>
            </motion.p>
            <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <LinkComponent isExternal href={turboIntegrations.livepeer.url}>
                <button className="btn btn-primary">Documentation</button>
              </LinkComponent>
              <motion.div className="mt-8 flex justify-center gap-14 text-2xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
                <LinkComponent href={livestreamPath}>
                  <button className={cn('btn hover:opacity-75', (pathname === videoOnDemandPath || pathname === watchVideoPath) && 'opacity-50')}>
                    Livestream
                  </button>
                </LinkComponent>
                <LinkComponent href={videoOnDemandPath}>
                  <button className={cn('btn hover:opacity-75', (pathname === livestreamPath || pathname === watchVideoPath) && 'opacity-50')}>
                    Video on demand
                  </button>
                </LinkComponent>
                <LinkComponent href={watchVideoPath}>
                  <button className={cn('btn hover:opacity-75', (pathname === videoOnDemandPath || pathname === livestreamPath) && 'opacity-50')}>
                    Watch Video
                  </button>
                </LinkComponent>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div className="flex h-full w-full justify-center" variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <div className="w-7/12">{children}</div>
        </motion.div>
      </motion.div>
    </LivepeerProvider>
  )
}
