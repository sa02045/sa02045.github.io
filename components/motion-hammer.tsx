'use client'

import DecryptedText from '@/components/DecryptedText/DecryptedText'
import { Hammer } from 'lucide-react'
import { motion } from 'motion/react'

export default function MotionHammer() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex items-center gap-2">
        <motion.div
          animate={{
            rotate: [0, -15, 0, -15, 0],
            y: [0, -8, 0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
          className="origin-bottom-right"
        >
          <Hammer className="h-10 w-10" />
        </motion.div>
        <DecryptedText
          text="공사중"
          speed={100}
          maxIterations={20}
          animateOn="view"
          revealDirection="center"
          className="text-4xl"
          parentClassName="all-letters"
          encryptedClassName="encrypted text-4xl"
        />
      </div>
    </div>
  )
}
