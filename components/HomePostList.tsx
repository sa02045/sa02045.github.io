import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from 'next/image'

interface Props {
  post: {
    slug: string
    date: string
    title: string
    tags: string[]
    summary: string
  }
}

export function HomePostList({ post }: Props) {
  const { slug, date, title, summary, tags } = post
  return (
    <Link href={`/blog/${slug}`} aria-label={`Read more: "${title}"`}>
      <li key={slug} className="py-12">
        <article className="flex flex-col items-start gap-8 md:flex-row">
          {/* 썸네일이 왼쪽 */}
          <div className="h-32 w-48 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={`/blog/${slug}`}
              alt={title + ' 썸네일'}
              className="h-full w-full rounded-2xl object-cover"
              loading="lazy"
              width={192}
              height={108}
              onError={(e) => {
                e.currentTarget.src = '/static/images/placeholder.png'
              }}
            />
          </div>
          {/* 정보가 오른쪽 */}
          <div className="flex-1">
            <div className="mb-2 flex items-center space-x-2 text-sm text-gray-500">
              <span>
                <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
              </span>
            </div>
            <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900">{title}</h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-500">{summary}</p>
          </div>
        </article>
      </li>
    </Link>
  )
}
