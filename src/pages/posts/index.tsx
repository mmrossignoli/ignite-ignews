
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './styles.module.scss';
import { createClient } from '../../../prismicio'
import { PrismicText   } from '@prismicio/react';
import * as prismicT from '@prismicio/types';
import Link from 'next/link';
type Post ={
  title: prismicT.RichTextField
  excerpt: {
    postExcerpt:{
    text:string;
  }
  }
  slug: string;
  updatedAt: string;
}


interface PostsProps{
  posts:Post[]
}
export default function Posts( { posts } :PostsProps) {
  return (
    <>
    <Head>
      <title>Post | Ignews</title>
    </Head>
    <main className={styles.container}>
      <div className={styles.posts}>
        {posts.map(post => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
          <a>
            <time>{post.updatedAt}</time>
            <strong><PrismicText field={post.title}/></strong>
            <p>{post.excerpt.postExcerpt.text}</p>
            </a>
            </Link>
        ))}
      </div>
    </main>
    </>
  );
}
export async function getStaticProps() {
  const client = createClient({ accessToken: process.env.PRISMIC_ACCESS_TOKEN });

  const response = await client.getAllByType('publication')
  const posts = response.map(post => {
    const postExcerpt = post.data.content.find(content => content.type === 'paragraph') ??''
    return {
      slug: post.uid,
      title: post.data.title,
      excerpt: {postExcerpt},
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
    };
  });
  return {
    props: { posts },
    revalidate: 60 * 60 * 24,
  }
}
