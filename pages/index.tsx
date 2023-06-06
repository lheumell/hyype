import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Layout from "../Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>HYYPE EVENT</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Hyype Event</h1>

          <div className={styles.grid}>
            <Link href="/events" className={styles.card}>
              <h2>Tous les evenements</h2>
              <p>Jette un oeil aux nouveaux evenements</p>
            </Link>

            <Link href="/about" className={styles.card}>
              <h2>A propos de nous</h2>
              <p>Si tu veux connaitre l'histoire de Hyype event !</p>
            </Link>

            <Link href="/create-events" className={styles.card}>
              <h2>Créer un evenement</h2>
              <p>Le plus simple c'est de commencer par la pratique</p>
            </Link>

            <Link href="" className={styles.card}>
              <h2>Deploy</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
