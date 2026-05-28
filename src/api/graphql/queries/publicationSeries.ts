import { gql } from '@apollo/client';
import { seriesListFields } from './fragments';

export default gql`
  query Publication($host: String!, $count: Int!, $after: String) {
    publication(host: $host) {
      id
      title
      seriesList(first: $count, after: $after) {
        ${seriesListFields}
      }
    }
  }
`;
