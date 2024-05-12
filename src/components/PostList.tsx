import React from 'react';
import { Link } from 'gatsby';
import type { Post as PostType } from '../schema';

interface Props {
  frontmatter: PostType['frontmatter'];
  to: string;
}

function Post({ frontmatter, to }: Props) {
  const { title, date, description, thumbnail } = frontmatter;
  return (
    <Link to={to} itemProp="url">
      <article
        className="group pb-10 hover:translate-y-3 transition mb-10"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="sm:flex">
          {thumbnail && (
            <div className="sm:mr-10">
              <img src={thumbnail} alt={title} className="sm:w-40 sm:h-40 object-cover rounded-lg w-full h-48" />
            </div>
          )}

          <div className="flex-col">
            <h3 className="mt-4 sm:text-2xl text-xl  group-hover:text-violet-400 md:text-nowrap">{title}</h3>
            <div className="text-gray-500 text-sm mt-2">{date}</div>
            <p className="mt-2 mb-1 text-gray-800">{description}</p>
          </div>
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
