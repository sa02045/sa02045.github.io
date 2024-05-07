import React from 'react';
import { Link } from 'gatsby';
import type { Post as PostType } from '../schema';

interface Props {
  description: string;
  date: string;
  title: string;
  to: string;
}

function Post({ date, title, description, to }: Props) {
  return (
    <Link to={to} itemProp="url">
      <article
        className="group pb-10 flex hover:translate-y-3 transition mb-10"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="flex-col">
          <h3 className="text-2xl group-hover:text-violet-400">{title}</h3>
          <p className="mt-6 mb-1 text-gray-600 text-base">{description}</p>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>
      </article>
    </Link>
  );
}

export function PostList({ posts }: { posts: PostType[] }) {
  return (
    <>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug;
        const description = post.frontmatter.description;
        const date = post.frontmatter.date;
        const to = post.fields.slug;
        return <Post key={post.fields.slug} title={title} description={description} date={date} to={to} />;
      })}
    </>
  );
}
