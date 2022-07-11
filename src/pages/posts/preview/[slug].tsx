import { createClient } from "../../../../prismicio";
import { GetStaticPaths, GetStaticProps } from "next"
import { getSession, useSession } from "next-auth/react"
import { endpoint } from "../../../../prismicio"
import * as prismicT from '@prismicio/types';
import Head from "next/head";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import styles from "../post.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps{
  post:{
  slug:string;
  title: prismicT.RichTextField
  content: prismicT.RichTextField
  updatedAt:string;
}
}

export default function PostPreview({post}:PostPreviewProps) {
  const {data:session} = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if(session?.activeSubscription){
      router.push(`/posts/${post.slug}`)

    }
  }
  , [post.slug, router, session])

  return(
    <>
    <Head>
      <title>Ignews</title>
    </Head>
    <main className={styles.container}>
      <article className={styles.post}> 
        <PrismicRichText field={post.title}/>
        <time>{post.updatedAt}</time>
        <div className={`${styles.postContent} ${styles.previewContent}`}>
        <PrismicRichText field={post.content}/>
        </div>
        <div className={styles.continueReading}>
          Wanna continue reading?
          <Link href="/">
          <a >Subscribe now 🤗</a>
          </Link>
        </div>
      </article>
    </main>
    </>
  )
}

export const getStaticPaths:GetStaticPaths = () => {
  return{
    paths:[],
    fallback:'blocking'
  }
}

export const getStaticProps:GetStaticProps= async ({ preview = false, previewData,params})=> {


  const client = createClient({ accessToken: process.env.PRISMIC_ACCESS_TOKEN });

  const response = await client.getByUID('publication',String(params?.slug))

  const post  = {
    slug:String(params?.slug),
    title: response.data.title,
    content: response.data.content.splice(0,7),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }
  return {
    props: { post },
    revalidate: 60*60*24,
  }
}