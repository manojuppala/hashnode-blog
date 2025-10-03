import { gql } from '@apollo/client';

export default gql`
  query SearchPostsOfPublication(
    $count: Int!
    $after: String
    $sortBy: PostSortBy
    $filter: SearchPostsOfPublicationFilter!
  ) {
    searchPostsOfPublication(first: $count, after: $after, sortBy: $sortBy, filter: $filter) {
      edges {
        node {
          id
          title
          subtitle
          slug
          brief
          url
          readTimeInMinutes
          publishedAt
          coverImage {
            url
          }
          tags {
            name
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
