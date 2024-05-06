import { graphql, useStaticQuery } from 'gatsby';

type SiteMetadata = {
  title: string;
  description: string;
  siteUrl: string;
  author: {
    name: string;
    summary: string;
  };
};

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author {
            name
            summary
          }
        }
      }
    }
  `);

  return data.site.siteMetadata as SiteMetadata;
};
