import Head from "next/head";
import NavBar from "../../components/NavBar";
import Link from "next/link";
import styles from "../../styles/Posts.module.css";

import { getBlogOverview } from "../../lib/notion";
import { useState } from "react";

function Post(props) {
  return (
    <div className={styles.post}>
      <Link href={`/blog/${encodeURIComponent(props.id)}`}>
        <h2 className={styles.postTitle}>{props.title}</h2>
      </Link>
      <span className={styles.postTime}>{props.date}</span>
      <p>{props.desc}</p>
    </div>
  );
}

function Collection({ posts, tag }) {
  return (
    <>
      {/* <h2 className={styles.tagTitle}>{tag}</h2> */}
      {posts.map((post, index) => (
        <Post
          key={index}
          id={post.id}
          title={post.properties.Name.title[0].plain_text}
          date={post.properties.Date.date.start}
          desc={post.properties.Text.rich_text[0]?.plain_text}
        />
      ))}
    </>
  );
}

export default function Blog({ posts, tags }) {
  const [tag, setTag] = useState("");
  return (
    <div className={styles.page}>
      <Head>
        <title>Walt Li | Blog</title>
      </Head>
      <div className={styles.container}>
        <NavBar loc="blog" />

        <div className={styles.tagBar}>
          <button
            className={
              styles.tagButton + (tag === "" ? ` ${styles.active}` : "")
            }
            onClick={() => setTag("")}
          >
            全部
          </button>
          {tags.map((t, index) => (
            <button
              key={index}
              className={
                styles.tagButton + (t === tag ? ` ${styles.active}` : "")
              }
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* if no tag selected */}
        {tag === "" && <Collection posts={posts} />}

        {/* if tag selected */}
        {tag !== "" && (
          <Collection
            posts={posts.filter(
              (post) => post.properties.Tags.multi_select[0].name === tag
            )}
          />
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getBlogOverview();
  let tags = posts.map((post) => post.properties.Tags.multi_select[0].name);
  tags = tags.filter((x, i, a) => a.indexOf(x) === i);
  return {
    props: {
      posts,
      tags,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 120, // In seconds
  };
}
