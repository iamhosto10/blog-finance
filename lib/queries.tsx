export const blogsQuery = `*[_type == "blog"]{
    title,
    focusTitle,
    continueTitle,
    slug,
    publishedAt,
    mainImage,
    miniatureImage,
    excerpt,
    audio {
      asset->
    },
    body,
    categories[]->{
      _id,
      title,
      slug
    },
    relatedNews[]->{
      _id,
      title,
      focusTitle,
      continueTitle,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      categories[]->{
        _id,
        title,
        slug
      }
    }
  }| order(publishedAt desc)`;

export const categoriesQuery = `*[_type == "category"]{ _id,title,slug }
`;

export const dolarQuery = `
*[_type == "dolar"] | order(fecha desc)[0]
`;

export const profitabilityQuery = `
    *[_type == "profitability"] | order(_createdAt asc)[0]{
      _id,
      _type,
      nu,
      lulo,
      global66,
      popular,
      rappi,
      bold,
      pibank
    }
  `;

export const banksQuery = `
*[_type == "banks"]{
  _id,
  title,
  slug,
  asset
}[]
 `;

export const franchieseQuery = `
 *[_type == "franchises"]{
  _id,
  name,
  slug,
  image
}[]
`;

export const cardsQuery = `*[_type == "cards"]{
  _id,
  name,
  image,
  bank->{
    _id,
    title,
    slug,
    asset
  },
  franchise->{
    _id,
    name,
    slug,
    image
  },
  cardType,  
  cuotaManejo,
  cuotaManejoExohonerable,
  tasaInteresEfectivaAnual,
  interesUnaCuota,
  seguroFraude,
  costoAvance,
  costoTransaccionesInternacionales,
  benefits,
  programaRecompensas,
  alianzas,
  ingresoMinimo,
  edadMinima,
  cupoMaximo,
  comprasInternacionales,
  bancaDigital,
  seguridad,
  score  
}[] `;
