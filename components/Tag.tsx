interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <span className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
      {text.split(' ').join('-')}
    </span>
  )
}

export default Tag
