export const blogsQuery = `*[_type == "blog"]{
    title,
    focusTitle,
    continueTitle,
    slug,
    publishedAt,
    mainImage,
    miniatureImage,
    excerpt,
    audio,
    body,
    categories[]->{
      _id,
      title
    },
    relatedNews[]->{
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt
    }
  }| order(publishedAt desc)`;

export const categoriesQuery = `*[_type == "category"]{ _id,title,slug }
`;

export const dolarQuery = `
*[_type == "dolar"] | order(fecha desc)[0]
`;
