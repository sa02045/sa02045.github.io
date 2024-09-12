import { graphql } from 'gatsby';
import * as React from 'react';
import type { Post } from '../schema';

import Layout from '../components/layout';
import { Seo } from '../components/seo';
import { PostList } from '../components/post-list';

const Posts = ({ data }: { data: any }) => {
  const posts = data.allMarkdownRemark.nodes as Post[];

  return (
    <Layout>
      <section>
        <PostList posts={posts} />
      </section>
    </Layout>
  );
};

export default Posts;

export const Head = () => <Seo />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, filter: { fields: { sourceName: { eq: "blog" } } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY.MM.DD")
          title
          description
        }
      }
    }
  }
`;
