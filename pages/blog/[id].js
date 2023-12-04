import { getPageContent, getBlogOverview, getPage } from "../../lib/notion";
import styles from "../../styles/Posts.module.css";
import Head from "next/head";
import Link from "next/link";

function ArticleNavbar() {
  return (
    <div className={styles.articleNavbar}>
      <Link href="/blog">
        <h2>BLOG</h2>
      </Link>
    </div>
  );
}

function NextArticle({ prevAndNext }) {
  return (
    <div className={styles.nextArticle}>
      {prevAndNext[1] && (
        <Link href={`/blog/${encodeURIComponent(prevAndNext[1])}`}>←上篇</Link>
      )}
      {prevAndNext[0] && (
        <Link href={`/blog/${encodeURIComponent(prevAndNext[0])}`}>下篇→</Link>
      )}
    </div>
  );
}

export default function Article({ article, pageInfo, prevAndNext }) {
  return (
    <div className={styles.articlePage}>
      <Head>
        <title>
          {`Walt Li | ${pageInfo.properties.Name.title[0].plain_text}`}
        </title>
      </Head>
      <div className="container">
        <ArticleNavbar />
        <div className={styles.title}>
          <div className={styles.articleh1}>
            <h1>{pageInfo.properties.Name.title[0].plain_text}</h1>
          </div>
          <div>{pageInfo.properties.Date.date.start}</div>
        </div>

        {article.map((para, index) => {
          if (para.type === "paragraph" && para.paragraph.rich_text.length) {
            return <p key={index}>{para.paragraph.rich_text[0]?.plain_text}</p>;
          }
          if (para.type == "divider") {
            return (
              <p key={index} className={styles.divider}>
                — + —
              </p>
            );
          }
        })}
        <NextArticle prevAndNext={prevAndNext} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const database = await getBlogOverview();
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: "blocking", // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
  };
}

export async function getStaticProps({ params }) {
  const article = await getPageContent(params.id);
  const pageInfo = await getPage(params.id);
  const posts = await getBlogOverview();

  // find prev and next post
  const i = posts.findIndex((post) => post.id === params.id);
  const prevAndNext = [];
  if (i === 0) {
    prevAndNext.push(null);
  } else {
    prevAndNext.push(posts[i - 1].id);
  }
  if (i === posts.length - 1) {
    prevAndNext.push(null);
  } else {
    prevAndNext.push(posts[i + 1].id);
  }
  console.log(prevAndNext);

  return {
    props: {
      article,
      pageInfo,
      prevAndNext,
    },
    revalidate: 120, // In seconds
  };
}
