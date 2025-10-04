import { gql } from '@apollo/client';

export default gql`
  query User($username: String!) {
    user(username: $username) {
      id
      username
      profilePicture
      bio {
        text
      }
      socialMediaLinks {
        website
        github
        stackoverflow
        linkedin
        youtube
      }
    }
  }
`;
