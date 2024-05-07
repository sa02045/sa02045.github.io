type Tag = 'react' | 'typescript' | 'ux';

export interface Post {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags: Tag[];
  };
  fields: {
    slug: string;
  };
}
