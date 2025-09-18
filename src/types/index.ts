export type Publication = {
  publication?: {
    id?: string;
    posts?: {
      edges?: { node: unknown }[];
    };
    post?: Post;
  };
};

export type Newsletter = {
  subscribeToNewsletter?: {
    status?: string;
  };
};

export type Edge = { node: unknown };

export type Post = {
  id: string;
  title: string;
  subtitle: string;
  brief: string;
  url: string;
  readTimeInMinutes: number;
  publishedAt: string;
  slug: string;
  coverImage: {
    url: string;
  };
  content: {
    markdown: string;
    html: string;
    text: string;
  };
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
  withImage: boolean;
  author: {
    id: string;
    name: string;
    username: string;
    socialMediaLinks?: {
      website?: string;
      github?: string;
    };
  };
};
