interface Book {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const booksData: Book[] = [
  {
    title: 'A Search Engine',
    description: `What if you could look up any information in the world? Webpages, images, videos
      and more. Google has many features to help you find exactly what you're looking
      for.`,
    imgSrc: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966262335.jpg',
    href: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966262335.jpg',
  },
  {
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
      to the desired date and press "Go". No more worrying about lost keys or
      forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

export default booksData
