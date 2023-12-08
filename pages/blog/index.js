import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import Link from "next/link";
import styles from "../../styles/Posts.module.css";

import { getBlogOverview } from "../../lib/notion";

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

function Collection({ posts }) {
  return (
    <>
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
  const router = useRouter();
  const filter = router.query.filter;
  const updateFilterQuery = (filter) =>
    router.push(
      { pathname: router.pathname, query: { filter: filter } },
      undefined,
      { shallow: true }
    );

  return (
    <div className={styles.page}>
      <Head>
        <title>Walt Li | Blog</title>
      </Head>
      <div className="container">
        <NavBar loc="blog" />

        <div className={styles.tagBar}>
          <button
            className={
              styles.tagButton +
              (!filter || filter === "all" ? ` ${styles.active}` : "")
            }
            onClick={() => updateFilterQuery("all")}
          >
            全部
          </button>
          {tags.map((t, index) => (
            <button
              key={index}
              className={
                styles.tagButton + (t === filter ? ` ${styles.active}` : "")
              }
              onClick={() => updateFilterQuery(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {!filter || filter === "all" ? (
          <Collection posts={posts} />
        ) : (
          <Collection
            posts={posts.filter(
              (post) => post.properties.Tags.multi_select[0].name === filter
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
