type Tag = 'react' | 'typescript' | 'ux';

export interface Post {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags: Tag[];
    thumbnail: string;
    hide: boolean;
  };
  fields: {
    slug: string;
  };
}
