import booksData from '@/data/booksData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Books' })

export default function Books() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5"></div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {booksData.map((d) => (
              <Card key={d.title} title={d.title} description={d.description} imgSrc={d.imgSrc} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
