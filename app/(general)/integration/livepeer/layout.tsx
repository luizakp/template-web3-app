'use client'
import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Balancer from 'react-wrap-balancer'

import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { cn } from '@/lib/utils'

interface LayoutIntegrationProps {
  children: ReactNode
}

const videoOnDemandPath = '/integration/livepeer/video-on-demand'
const livestreamPath = '/integration/livepeer/livestream'

export default function LayoutIntegration({ children }: LayoutIntegrationProps) {
  const pathname = usePathname()

  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center">
        <motion.div
          animate="show"
          className="max-w-screen-xl px-5 text-center xl:px-0"
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
          <Image alt="Livepeer Icon" className="mx-auto mb-5" height={100} src={turboIntegrations.livepeer.imgDark} width={100} />
          <motion.h1
            className="text-gradient-livepeer my-4 text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
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
              <LinkComponent href={videoOnDemandPath}>
                <button className={cn('btn hover:opacity-75', pathname === livestreamPath && 'opacity-50')}>Video on demand</button>
              </LinkComponent>
              <LinkComponent href={livestreamPath}>
                <button className={cn('btn hover:opacity-75', pathname === videoOnDemandPath && 'opacity-50')}>Livestream</button>
              </LinkComponent>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {children}
    </>
  )
}
