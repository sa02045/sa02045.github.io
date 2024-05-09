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

      <meta property="og:site_name" content="FE 개발자 승희 블로그" />

      <meta name="description" content={seo.description} />
      <meta property="og:description" content={seo.description} />
      <meta name="twitter:description" content={seo.description} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />

      <meta name="author" content={metadata.author.name} />
      <meta name="keywords" content={seo.keywords.join(', ')} />

      <meta property="og:image" content={seo.thumbnail} />

      <meta name="twitter:card" content="summary" />

      {children}
    </>
  );
};
