import FuzzyText from '@/components/FuzzyText/FuzzyText'
import { useSearchParams } from 'next/navigation'
import DecryptedText from '@/components/DecryptedText/DecryptedText'

export default function Home() {
  return (
    <>
      <DecryptedText
        text="This text animates when in view"
        animateOn="view"
        revealDirection="center"
      />
    </>
  )
}
