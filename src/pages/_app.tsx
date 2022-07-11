import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import "../styles/global.scss";
import { SessionProvider } from "next-auth/react"
import { PrismicProvider } from "@prismicio/react";
import { linkResolver, repositoryName } from '../../prismicio'
import Link from "next/link";
import { PrismicPreview } from "@prismicio/next";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider
    linkResolver={linkResolver}
    internalLinkComponent={({ href, children, ...props }) => (
      <Link href={href}>
        <a {...props}>
          {children}
        </a>
      </Link>
    )}
  >
      <SessionProvider session={pageProps.session }>
        <Header />  
        <Component {...pageProps} />
        <PrismicPreview repositoryName={repositoryName}>
      </PrismicPreview>
      </SessionProvider>
    </PrismicProvider>
  );
}

export default MyApp;
