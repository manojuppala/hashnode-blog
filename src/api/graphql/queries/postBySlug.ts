import { gql } from "@apollo/client";
import { postFields } from "./fragments";

export default gql`
  query ($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        ${postFields}
        }
    }
  }
`;
