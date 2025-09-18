import { gql } from '@apollo/client';
import { postFields } from './fragments';

export default gql`
  query Post($id: ID!) {
    post(id: $id) {
      ${postFields}
    }
  }
`;
