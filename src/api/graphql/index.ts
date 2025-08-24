import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import type { OperationVariables } from "@apollo/client";
import publicationQuery from "../graphql/queries/publication";
import postByIdQuery from "./queries/postById";
import postBySlugQuery from "./queries/postBySlug";
import type { Publication as PublicationType, Post as PostType } from "../../types";
import { formatPost } from "./util";
// import omitDeep from "@types/omit-deep";
const HOST = "manojuppala.hashnode.dev";

const GraphQL = (() => {
  const createClient = (url: string) =>
    new ApolloClient({
      link: new HttpLink({
        uri: url,
      }),
      cache: new InMemoryCache(),
    });
  const client = createClient("https://gql.hashnode.com");

  const gqlQuery = async (
    params: ApolloClient.QueryOptions<Record<string, unknown>, OperationVariables>
  ) => {
    const result = await client.query<Record<string, unknown>>(params);
    const { data } = result;
    return data;
  };

  return {
    query: gqlQuery,
  };
})();

export const getPublication = async ({ count = 10 }) => {
  const res = (await GraphQL.query({
    query: publicationQuery,
    variables: { host: HOST, count },
  })) as PublicationType;
  const finalRes = formatPost(res);
  //   return omitDeep(finalRes ?? {}, ["__typename"]);
  return finalRes;
};

export const getPostById = async ({ id }: { id: string }) => {
  const res = (await GraphQL.query({
    query: postByIdQuery,
    variables: { host: HOST, id },
  })) as PostType;
  //   return omitDeep(finalRes ?? {}, ["__typename"]);
  return res;
};

export const getPostBySlug = async ({ slug }: { slug: string }) => {
  const res = (await GraphQL.query({
    query: postBySlugQuery,
    variables: { host: HOST, slug },
  })) as PublicationType;
  const finalRes = res?.publication?.post;
  //   return omitDeep(finalRes ?? {}, ["__typename"]);
  return finalRes;
};
