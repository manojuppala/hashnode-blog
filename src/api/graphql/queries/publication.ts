import { gql } from '@apollo/client';
import { seriesListFields } from './fragments';

export default gql`
  query Publication($host: String!, $count: Int!, $after: String) {
    publication(host: $host) {
      id
      title
      posts(first: $count, after: $after) {
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
        pageInfo {
          hasNextPage
          endCursor
        }
        totalDocuments
      }
      seriesList(first: $count, after: $after) {
        ${seriesListFields}
      }
    }
  }
`;
