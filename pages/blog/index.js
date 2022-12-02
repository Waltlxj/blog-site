import Head from "next/head";
import NavBar from "../../components/NavBar";
import Link from "next/link";
import styles from "../../styles/Posts.module.css";

import { getBlogOverview } from "../../lib/notion";

function Post(props) {
  return (
    <div className={styles.post}>
      <div>Written on {props.date}</div>
      <Link href={`/blog/${encodeURIComponent(props.id)}`}>
        <h1>{props.title}</h1>
      </Link>
      <p>{props.desc}</p>
    </div>
  );
}

export default function Blog({ posts }) {
  return (
    <div className={styles.page}>
      <Head>
        <title>Walt Li | Blog</title>
      </Head>
      <div className={styles.container}>
        <NavBar />
        {posts.map((post, index) => (
          <Post
            key={index}
            id={post.id}
            title={post.properties.Name.title[0].plain_text}
            date={post.properties.Date.date.start}
            desc={post.properties.Text.rich_text[0].plain_text}
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getBlogOverview();
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 120, // In seconds
  };
}
