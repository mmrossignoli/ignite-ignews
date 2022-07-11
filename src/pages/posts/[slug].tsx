import { createClient } from "../../../prismicio";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { endpoint } from "../../../prismicio"
import * as prismicT from '@prismicio/types';
import Head from "next/head";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import styles from "./post.module.scss";

interface PostProps{
  post:{
  slug:string;
  title: prismicT.RichTextField
  content: prismicT.RichTextField
  updatedAt:string;
}
}

export default function Post({post}:PostProps) {
  
  return(
    <>
    <Head>
      <title>Ignews</title>
    </Head>
    <main className={styles.container}>
      <article className={styles.post}> 
        <PrismicRichText field={post.title}/>
        <time>{post.updatedAt}</time>
        <div className={styles.postContent}>
        <PrismicRichText field={post.content}/>
        </div>
      </article>
    </main>
    </>
  )
}
export const getServerSideProps:GetServerSideProps= async ({req, preview = false, previewData,params})=> {
  const session = await getSession({req}) 
  console.log(session)
if(!session?.activeSubscription){
  return {
    redirect:{
      destination:'/',
      permanent:false
    }
  }
}

  const client = createClient({ accessToken: process.env.PRISMIC_ACCESS_TOKEN });

  const response = await client.getByUID('publication',String(params?.slug))

  const post  = {
    slug:String(params?.slug),
    title: response.data.title,
    content: response.data.content,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }
  return {
    props: { post }, // Will be passed to the page component as props
  }
}