import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import type { OperationVariables } from '@apollo/client';
import publicationQuery from '../graphql/queries/publication';
import postByIdQuery from './queries/postById';
import postBySlugQuery from './queries/postBySlug';
import subscribeToNewsletterMutation from './mutations/subscribeToNewsletter';
import type { Publication as PublicationType, Post as PostType, Newsletter as NewsletterType } from '../../types';
import { useAppStore } from '../../store';
import { formatPost } from './util';
// import omitDeep from "@types/omit-deep";
const HOST = import.meta.env.VITE_HASHNODE_HOST;

const GraphQL = (() => {
  const createClient = (url: string) =>
    new ApolloClient({
      link: new HttpLink({
        uri: url
      }),
      cache: new InMemoryCache()
    });
  const client = createClient('https://gql.hashnode.com');

  const gqlQuery = async (params: ApolloClient.QueryOptions<Record<string, unknown>, OperationVariables>) => {
    const result = await client.query<Record<string, unknown>>(params);
    const { data } = result;
    return data;
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

export const getPublication = async ({ count = 10 }) => {
  const res = (await GraphQL.query({
    query: publicationQuery,
    variables: { host: HOST, count }
  })) as PublicationType;
  const finalRes = formatPost(res);
  const publicationId = res?.publication?.id ?? '';
  updatePublicationId(publicationId);
  //   return omitDeep(finalRes ?? {}, ["__typename"]);
  return finalRes;
};

export const getPostById = async ({ id }: { id: string }) => {
  const res = (await GraphQL.query({
    query: postByIdQuery,
    variables: { host: HOST, id }
  })) as PostType;
  //   return omitDeep(finalRes ?? {}, ["__typename"]);
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
  //   return omitDeep(finalRes ?? {}, ["__typename"]);
  return finalRes;
};

export const subscribeToNewsletter = async ({ email }: { email: string }): Promise<void> => {
  const publicationId = useAppStore.getState().publicationId;
  try {
    const res = (await GraphQL.mutation({
      mutation: subscribeToNewsletterMutation,
      variables: { input: { publicationId, email } }
    })) as NewsletterType;
    //   return omitDeep(finalRes ?? {}, ["__typename"]);
    const status = res?.subscribeToNewsletter?.status ?? '';
    updateNewsletterInfo(status);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      updateNewsletterInfo('ERROR', error.message);
    }
  }
};
