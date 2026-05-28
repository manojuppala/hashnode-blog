export type Publication = {
  publication?: {
    id?: string;
    posts?: {
      edges?: { node: unknown }[];
      pageInfo?: {
        hasNextPage?: boolean;
        endCursor?: string;
      };
      totalDocuments?: number;
    };
    post?: Post;
    seriesList?: {
      edges?: { node: Series }[];
      pageInfo?: {
        hasNextPage?: boolean;
        endCursor?: string;
      };
      totalDocuments?: number;
    };
    series?: {
      id: string;
      name: string;
      slug: string;
      cuid?: string;
      description?: {
        markdown?: string;
        html?: string;
        text?: string;
      };
      coverImage?: string;
      posts?: {
        edges?: { node: Post }[];
        pageInfo?: {
          hasNextPage?: boolean;
          endCursor?: string;
        };
        totalDocuments?: number;
      };
    };
  };
  searchPostsOfPublication?: {
    edges?: { node: Post }[];
    pageInfo?: {
      hasNextPage?: boolean;
      endCursor?: string;
    };
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

export type User = {
  id?: string;
  username?: string;
  profilePicture?: string;
  socialMediaLinks?: {
    website?: string;
    github?: string;
    stackoverflow?: string;
    linkedin?: string;
    youtube?: string;
  };
};

export type Series = {
  id: string;
  name: string;
  slug: string;
  description?: {
    markdown?: string;
    html?: string;
    text?: string;
  };
  coverImage?: string;
};
