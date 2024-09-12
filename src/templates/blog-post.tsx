import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { Seo } from '../components/seo';
import { Giscus } from '../components/giscus';

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        description: string;
        date: string;
        keywords: string[];
        thumbnail: string;
      };
      html: string;
    };
  };
};

export const Head = ({ data: { markdownRemark } }: Props) => {
  return (
    <Seo
      title={markdownRemark.frontmatter.title}
      description={markdownRemark.frontmatter.description}
      keywords={markdownRemark.frontmatter.keywords}
      thumbnail={markdownRemark.frontmatter.thumbnail}
    />
  );
};

const BlogPostTemplate = ({ data: { markdownRemark } }: Props) => {
  const dateText = new Date(markdownRemark.frontmatter.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      <article className="flex flex-col w-full" itemScope itemType="http://schema.org/Article">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">{markdownRemark.frontmatter.title}</h1>
          <p className="text-sm mt-6">{dateText}</p>
        </div>
        <section
          className="article-section"
          dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
          itemProp="articleBody"
        ></section>
        <Giscus />
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        keywords
        thumbnail
      }
    }
  }
`;
