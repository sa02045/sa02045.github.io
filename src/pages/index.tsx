import { graphql } from 'gatsby';
import * as React from 'react';
import type { Post } from '../schema';
import Snowfall from 'react-snowfall';

import Layout from '../components/layout';
import { Seo } from '../components/seo';
import { PostList } from '../components/post-list';

const Home = ({ data }: { data: any }) => {
  const posts = data.allMarkdownRemark.nodes as Post[];

  return (
    <Layout>
      <div
        style={{
          height: '100vh',
          width: '100vw',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        <Snowfall color="#fff" />
      </div>
      ,
      <section>
        <PostList posts={posts} />
      </section>
    </Layout>
  );
};

export default Home;

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
          tags
          thumbnail
          hide
        }
      }
    }
  }
`;
