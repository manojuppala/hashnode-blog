import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import type { OperationVariables } from '@apollo/client';
import publicationQuery from '../graphql/queries/publication';
import postByIdQuery from './queries/postById';
import postBySlugQuery from './queries/postBySlug';
import searchPostsQuery from './queries/searchPosts';
import subscribeToNewsletterMutation from './mutations/subscribeToNewsletter';
import type { Publication as PublicationType, Post as PostType, Newsletter as NewsletterType } from '../../types';
import { useAppStore } from '../../store';
import { formatPost } from './util';
// import omitDeep from "@types/omit-deep";
const HOST = import.meta.env.VITE_HASHNODE_HOST;
const ENDPOINT = 'https://gql.hashnode.com';

const GraphQL = (() => {
  const createClient = (url: string) =>
    new ApolloClient({
      link: new HttpLink({
        uri: url
      }),
      cache: new InMemoryCache()
    });
  const client = createClient(ENDPOINT);

  const gqlQuery = async (params: ApolloClient.QueryOptions<Record<string, unknown>, OperationVariables>) => {
    setLoading(true);
    try {
      const result = await client.query<Record<string, unknown>>(params);
      const { data } = result;
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const gqlMutation = async (params: ApolloClient.MutateOptions<Record<string, unknown>, OperationVariables>) => {
    const result = await client.mutate<Record<string, unknown>>(params);
    const { data } = result;
    return data;
  };

  return {
    query: gqlQuery,
    mutation: gqlMutation
  };
})();

const updatePublicationId = (id: string) => !!id && useAppStore.setState({ publicationId: id });
const updateNewsletterInfo = (status: string, errorMsg: string = '') =>
  !!status && useAppStore.setState({ newsletterStatus: status, newsletterErrorMsg: errorMsg || '' });
const updateCursor = (cursor: Record<string, string>) =>
  useAppStore.setState((state) => ({ pagination: { ...state.pagination, cursor } }));
const updatePagination = (pagination: {
  totalPosts: number;
  currentPage: number;
  hasNextPage: boolean;
  cursor: Record<string, string>;
}) => useAppStore.setState({ pagination });
const updateBlogPosts = (posts: PostType[]) => useAppStore.setState({ blogPosts: posts });
const updateHomePosts = (posts: PostType[]) => useAppStore.setState({ homePosts: posts });
const setLoading = (loading: boolean) => useAppStore.setState({ loading });

export const searchPublication = async ({
  count = 10,
  page,
  search = ''
}: {
  count: number;
  page?: number;
  search?: string;
}) => {
  const pagination = useAppStore.getState().pagination;
  const publicationId = useAppStore.getState().publicationId;
  const after = pagination?.cursor?.[String(page)];
  const query = (variables: {
    host?: string;
    after?: string;
    count: number;
    sortBy?: string;
    filter?: {
      query: string;
      publicationId?: string;
    };
  }) =>
    GraphQL.query({
      query: searchPostsQuery,
      variables
    });
  const res = (await query({
    count,
    sortBy: 'DATE_PUBLISHED_DESC',
    ...(after && { after }),
    filter: {
      query: search,
      publicationId
    }
  })) as PublicationType;
  if (page) {
    const totalPosts = res?.publication?.posts?.totalDocuments ?? 0;
    const hasNextPage = res?.searchPostsOfPublication?.pageInfo?.hasNextPage ?? false;
    const endCursor = res?.searchPostsOfPublication?.pageInfo?.endCursor;
    const cursor = { ...pagination?.cursor, [String(page + 1)]: endCursor || '' };
    updatePagination({
      totalPosts,
      currentPage: page ?? 1,
      hasNextPage,
      cursor
    });
    if (page === 1 && hasNextPage) {
      const nextPageRes = (await query({
        count,
        sortBy: 'DATE_PUBLISHED_DESC',
        after: endCursor,
        filter: {
          query: search,
          publicationId
        }
      })) as PublicationType;
      const nextPageEndCursor = nextPageRes?.publication?.posts?.pageInfo?.endCursor;
      updateCursor({ ...cursor, [String(page + 2)]: nextPageEndCursor || '' });
    }
  }
  const finalRes = res?.searchPostsOfPublication?.edges?.map((edge) => edge.node) ?? [];
  const publication = res?.publication?.id ?? '';
  updatePublicationId(publication);
  updateBlogPosts(finalRes);
};

export const getPublication = async ({ count = 10, page }: { count: number; page?: number }) => {
  const searchTerm = useAppStore.getState().searchTerm;
  if (searchTerm && page) {
    if (searchTerm.length > 3) {
      await searchPublication({ count, page, search: searchTerm });
    }
    return;
  }
  const pagination = useAppStore.getState().pagination;
  const after = pagination?.cursor?.[String(page)];
  const query = (variables: { host: string; count: number; after?: string }) =>
    GraphQL.query({
      query: publicationQuery,
      variables
    });
  const res = (await query({
    host: HOST,
    count,
    ...(after && { after })
  })) as PublicationType;
  if (page) {
    const totalPosts = res?.publication?.posts?.totalDocuments ?? 0;
    const hasNextPage = res?.publication?.posts?.pageInfo?.hasNextPage ?? false;
    const endCursor = res?.publication?.posts?.pageInfo?.endCursor;
    const cursor = { ...pagination?.cursor, [String(page + 1)]: endCursor || '' };
    updatePagination({
      totalPosts,
      currentPage: page ?? 1,
      hasNextPage,
      cursor
    });
    if (page === 1 && hasNextPage) {
      const nextPageRes = (await query({
        host: HOST,
        count,
        after: endCursor
      })) as PublicationType;
      const nextPageEndCursor = nextPageRes?.publication?.posts?.pageInfo?.endCursor;
      updateCursor({ ...cursor, [String(page + 2)]: nextPageEndCursor || '' });
    }
  }
  const finalRes = (formatPost(res) ?? []) as PostType[];
  const publication = res?.publication?.id ?? '';
  updatePublicationId(publication);
  if (page) {
    updateBlogPosts(finalRes);
  } else {
    updateHomePosts(finalRes);
  }
};

export const getPostById = async ({ id }: { id: string }) => {
  const res = (await GraphQL.query({
    query: postByIdQuery,
    variables: { host: HOST, id }
  })) as PostType;
  return res;
};

export const getPostBySlug = async ({ slug }: { slug: string }) => {
  const res = (await GraphQL.query({
    query: postBySlugQuery,
    variables: { host: HOST, slug }
  })) as PublicationType;
  const finalRes = res?.publication?.post;
  const publicationId = res?.publication?.id ?? '';
  updatePublicationId(publicationId);
  return finalRes;
};

export const subscribeToNewsletter = async ({ email }: { email: string }): Promise<void> => {
  const publicationId = useAppStore.getState().publicationId;
  try {
    const res = (await GraphQL.mutation({
      mutation: subscribeToNewsletterMutation,
      variables: { input: { publicationId, email } }
    })) as NewsletterType;
    const status = res?.subscribeToNewsletter?.status ?? '';
    updateNewsletterInfo(status);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      updateNewsletterInfo('ERROR', error.message);
    }
  }
};
