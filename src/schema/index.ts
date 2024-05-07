export interface Post {
  frontmatter: {
    title: string;
    description: string;
    date: string;
  };
  fields: {
    slug: string;
  };
}
