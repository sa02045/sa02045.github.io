import React from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';

interface Props {
  description?: string;
  title?: string;
  children?: React.ReactNode;
  keywords?: string[];
  publishedTime?: string;
  thumbnail?: string;
}

export const Seo = ({ description, title, children, publishedTime, keywords, thumbnail }: Props) => {
  const metadata = useSiteMetadata();

  const seo = {
    title: title || metadata.title,
    description: description || metadata.description,
    publishedTime: publishedTime ? new Date(publishedTime).toISOString() : '',
    keywords: keywords || ['FE', 'Frontend', 'React', 'TypeScript', 'JavaScript', 'UX'],
    thumbnail: thumbnail || '',
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta property="og:title" content={seo.title} />
      <meta name="twitter:title" content={seo.title} />

      <meta name="article:published_time" content={publishedTime} />

      <meta name="description" content={seo.description} />
      <meta name="twitter:description" content={seo.description} />

      <meta name="author" content={metadata.author.name} />
      <meta name="keywords" content={seo.keywords.join(', ')} />

      <meta property="og:site_name" content="FE 개발자 seunghee 블로그" />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image" content={seo.thumbnail} />
      <meta property="og:image:url" content={seo.thumbnail} />
      <meta property="og:image:secure_url" content={seo.thumbnail} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="720" />
      <meta property="og:image:height" content="720" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.thumbnail} />
      <meta name="twitter:label1" content="키워드" />
      <meta name="twitter:data1" content={seo.keywords.join(', ')} />

      <meta property="article:published_time" content={seo.publishedTime} />

      {children}
    </>
  );
};
