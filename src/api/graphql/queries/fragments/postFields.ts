export default `
      id
      slug
      previousSlugs
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
      bannerImage {
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
      audioUrls {
        male
        female
      }
      seo {
        title
        description
      }
`;
