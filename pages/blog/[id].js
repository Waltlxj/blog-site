import { getPageContent, getBlogOverview, getPage } from "../../lib/notion";
import styles from "../../styles/Posts.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";

export default function Article({ article, pageInfo }) {
  const router = useRouter();
  return (
    <div className={styles.page}>
      <Head>
        <title>
          {`Walt Li | ${pageInfo.properties.Name.title[0].plain_text}`}
        </title>
      </Head>
      <div className={styles.container}>
        {/* <NavBar /> */}

        <div className={styles.title}>
          <button className="back-button" onClick={() => router.back()}>
            ← Back
          </button>
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
                ***
              </p>
            );
          }
        })}
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const database = await getBlogOverview();
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: false,
  };
};

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
