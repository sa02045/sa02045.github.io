import React from 'react';
import { Link } from 'gatsby';
import type { Post as PostType } from '../schema';

interface Props {
  frontmatter: PostType['frontmatter'];
  to: string;
}

function Post({ frontmatter, to }: Props) {
  const { title, date, description } = frontmatter;
  return (
    <Link to={to} itemProp="url">
      <article
        className="group pb-10 flex hover:translate-y-3 transition mb-10"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="flex-col">
          <h3 className="text-2xl group-hover:text-violet-400 text-nowrap">{title}</h3>
          <div className="text-gray-500 text-sm mt-2">{date}</div>
          <p className="mt-2 mb-1 text-gray-800 text-base">{description}</p>
        </div>
      </article>
    </Link>
  );
}

export function PostList({ posts }: { posts: PostType[] }) {
  return (
    <>
      {posts.map(post => {
        const to = post.fields.slug;
        return <Post key={post.fields.slug} to={to} frontmatter={post.frontmatter} />;
      })}
    </>
  );
}
