import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

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
        <article>
          <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
            <div className="space-y-5 xl:col-span-3">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                </div>
                <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>

                <div className="flex flex-wrap">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>

                  <div className="ml-3">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </li>
    </Link>
  )
}
