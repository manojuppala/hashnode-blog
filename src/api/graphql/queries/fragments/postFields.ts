export default `
      id
      slug
      title
      subtitle
      tags {
        id
        name
        slug
      }
      url
      cuid
      coverImage {
        url
      }
      brief
      readTimeInMinutes
      content {
        markdown
        html
        text
      }
      publishedAt
      seo {
        title
        description
      }
      author {
        id
        username
        name
        socialMediaLinks {
        website
        github
        stackoverflow
        linkedin
        youtube
        }
      }
`;
