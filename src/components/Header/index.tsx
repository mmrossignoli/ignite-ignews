import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";
export function Header() {
  
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={108.45}
          height={30.27}
        />
        <nav>
          <ActiveLink href="/"  activeClassName={styles.active}>
          <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
          <a >Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
