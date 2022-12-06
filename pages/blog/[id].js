import { getPageContent, getBlogOverview, getPage } from "../../lib/notion";
import styles from "../../styles/Posts.module.css";
import Head from "next/head";
import Link from "next/link";

export default function Article({ article, pageInfo }) {
  return (
    <div className={styles.page}>
      <Head>
        <title>
          {`Walt Li | ${pageInfo.properties.Name.title[0].plain_text}`}
        </title>
      </Head>
      <div className={styles.container}>
        <div className={styles.title}>
          <Link href="/blog">← Back</Link>
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
                ————————
              </p>
            );
          }
        })}
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
  // console.log(pageInfo);
  return {
    props: {
      article,
      pageInfo,
    },
    revalidate: 120, // In seconds
  };
}
