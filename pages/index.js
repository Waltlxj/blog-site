import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import { getPageContent } from "../lib/notion";

function Welcome() {
  return (
    <div className={styles.page}>
      <div className={styles.cover}>
        <div className={styles.coverRow}>
          <h1>WALT LI</h1>
          <h1>炬</h1>
        </div>
        <div className={styles.coverRow}>
          <div className="navItem">
            <Link href="/blog">BLOG</Link>
          </div>
          <div className="navItem">
            <Link href="/blog">杂文</Link>
          </div>
        </div>
        <div className={styles.coverRow}>
          <div className="navItem">
            <Link href="/gallery">GALLERY</Link>
          </div>
          <div className="navItem">
            <Link href="/gallery">相册</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function About({ introduction }) {
  return (
    <div className={styles.page}>
      <div className="container">
        <h2 className={styles.introTitle}>about me</h2>
        <div>
          {introduction.map((para, index) => {
            if (para.type === "paragraph" && para.paragraph.rich_text.length) {
              return (
                <p key={index}>{para.paragraph.rich_text[0]?.plain_text}</p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default function Home({ introduction }) {
  return (
    <div className={styles.window}>
      <Head>
        <title>Walt Li</title>
      </Head>
      <Welcome />
      <About introduction={introduction} />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const introduction = await getPageContent(process.env.INTRO_PAGE_ID);

  return {
    props: {
      introduction,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 120, // In seconds
  };
}
