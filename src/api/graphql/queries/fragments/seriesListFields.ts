export default `
      pageInfo {
          endCursor
          hasNextPage
          totalDocuments
        }
        edges {
          node {
            id
            name
            slug
            description {
              markdown
              html
              text
            }
            coverImage
          }
        }
`;
