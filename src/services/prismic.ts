  import Prismic from '@prismicio/client'

  export function getPrismicClient() {
    const prismic = new Prismic.Client(process.env.PRISMIC_ACCESS_TOKEN as string ,
      {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN
      })
    return prismic
  }