import Image from './Image'

const Card = ({ title, description, imgSrc }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${'h-full'} overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      <Image alt={title} src={imgSrc} className="" width={300} height={306} />
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </div>
)

export default Card
