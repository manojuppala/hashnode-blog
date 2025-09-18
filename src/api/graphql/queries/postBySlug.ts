import { gql } from '@apollo/client';
import { postFields } from './fragments';

export default gql`
  query ($host: String!, $slug: String!) {
    publication(host: $host) {
      id
      post(slug: $slug) {
        ${postFields}
        }
    }
  }
`;
