'use client'

import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 초기 상태 설정

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-4'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="h-6 text-2xl font-semibold">{siteMetadata.headerTitle}</div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar flex max-w-40 flex-row items-center space-x-4 overflow-x-auto sm:space-x-6 md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              >
                {link.title}
              </Link>
            ))}
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-1/2 w-screen -translate-x-1/2 border-t border-gray-200 transition-opacity duration-200 dark:border-gray-800 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
      ></div>
    </header>
  )
}

export default Header
