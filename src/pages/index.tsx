import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}
export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>
            <Image
              src="/images/emojiClap.svg"
              width={26}
              height={26}
              alt="emoji clap"
            ></Image>{" "}
            Hey, welcome
          </span>
          <h1>
            News about the <span>React</span> world
          </h1>
          <p>
            Get access to all the publications
            <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image
          src="/images/avatar.svg"
          width={334}
          height={520}
          alt="avatar image"
        ></Image>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1LIf8GHJL5GkQSEtgiiIcXGP");
  const product = {
    priceId: price.id,
    billing_scheme: price.billing_scheme,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount! / 100),
  };
  return {
    props: { product },
    revalidate: 60 * 60 * 24,
  };
};
