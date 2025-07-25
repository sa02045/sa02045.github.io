import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t bg-white dark:bg-black">
      <div className="flex flex-col items-center py-2">
        <div className="mb-1 flex space-x-4">
          {/* <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} /> */}
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          {/* <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} /> */}
          {/* <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} /> */}
          {/* <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} /> */}
          {/* <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} /> */}
          {/* <SocialIcon kind="bluesky" href={siteMetadata.bluesky} size={6} /> */}
          {/* <SocialIcon kind="x" href={siteMetadata.x} size={6} /> */}
          {/* <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} /> */}
          {/* <SocialIcon kind="threads" href={siteMetadata.threads} size={6} /> */}
          {/* <SocialIcon kind="medium" href={siteMetadata.medium} size={6} /> */}
        </div>
        <div className="flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
        </div>
      </div>
    </footer>
  )
}
