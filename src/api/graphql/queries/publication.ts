import { gql } from '@apollo/client';

export default gql`
  query Publication($host: String!, $count: Int!) {
    publication(host: $host) {
      id
      title
      posts(first: $count) {
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
        }
      }
    }
  }
`;
