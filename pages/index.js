import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";

import NavBar from "../components/NavBar";

function Welcome() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <h1>WALT LI</h1>
          <h1>炬</h1>
        </div>
        <div className={styles.flexContainer}>
          <div className="navItem">
            <Link href="/blog">BLOG</Link>
          </div>
          <div className="navItem">
            <Link href="/blog">杂文</Link>
          </div>
        </div>
        <div className={styles.flexContainer}>
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

function About() {
  return (
    <div className={styles.page}>
      <div className={styles.articleContainer}>
        <h2>about me</h2>
        <div>
          <p>I am senior psychology and CS major at Carleton College, MN.</p>
          <p>卡尔顿学院大四心理学与计算机科学双专业。</p>
          <p>
            I like technology, nature, people-watching, sci-fi, photography &
            digital art, classical singing, Pokémon.
          </p>
          <p>我喜欢技术，自然，人类观察，摄影与数字艺术，声乐，口袋妖怪。</p>
          <p>
            Based on IPIP Big-Five factor markers (50-item) and the population
            statistics, my self-report shows that I am more introverted than 91%
            of people, more neurotic than 81% of people, less agreeable than 86%
            of people, more conscientious than 72% of people, and more
            intellectually active than 65% of people.
          </p>
          <p>
            根据五大性格特质的测量和人群数据，我自评比91%的人更内向，比81%的人更情绪多变，
            比86%的人更加不友善，比72%的人更加负责任，比65%的人更加喜欢动脑子。
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home({ info }) {
  return (
    <div>
      <Head>
        <title>Walt Li</title>
      </Head>
      <Welcome />
      <About />
    </div>
  );
}

export async function getStaticProps() {
  const info = null;

  return {
    props: {
      info,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 120, // In seconds
  };
}
