import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { Seo } from '../components/Seo';
import Giscus from '../components/Giscus';

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        description: string;
        date: string;
      };
      html: string;
    };
  };
};

export const Head = ({ data: { markdownRemark: post } }: Props) => {
  return <Seo title={post.frontmatter.title} description={post.frontmatter.description} />;
};

const BlogPostTemplate = ({ data: { markdownRemark } }: Props) => {
  const dateText = new Date(markdownRemark.frontmatter.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      <article className="flex flex-col" itemScope itemType="http://schema.org/Article">
        <div className="mb-10">
          <h1 className="text-3xl">{markdownRemark.frontmatter.title}</h1>
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
      }
    }
  }
`;
