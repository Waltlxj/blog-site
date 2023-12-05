import Image from "next/image";
import probe from "probe-image-size";
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
      {prevAndNext.prev && (
        <Link href={`/blog/${encodeURIComponent(prevAndNext.prev)}`}>
          ←上篇
        </Link>
      )}
      {prevAndNext.next && (
        <Link href={`/blog/${encodeURIComponent(prevAndNext.next)}`}>
          下篇→
        </Link>
      )}
    </div>
  );
}

function ArticleTitle({ pageInfo }) {
  return (
    <div className={styles.title}>
      <div className={styles.articleh1}>
        <h1>{pageInfo.properties.Name.title[0].plain_text}</h1>
      </div>
      <div>{pageInfo.properties.Date.date.start}</div>
    </div>
  );
}

function ArticleContent({ article }) {
  // console.log(article);
  return (
    <article>
      {article.map((block, index) => {
        if (block.type === "paragraph") {
          return <p key={index}>{block.text}</p>;
        } else if (block.type === "divider") {
          return (
            <p key={index} className={styles.divider}>
              — + —
            </p>
          );
        } else if (block.type === "image") {
          return (
            <div className={styles.imageContainer} key={index}>
              <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                className={styles.image}
              />
              {block.caption && (
                <div className={styles.imageCaption}>{block.caption}</div>
              )}
            </div>
          );
        }
      })}
    </article>
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
      <ArticleNavbar />
      <div className="container">
        <ArticleTitle pageInfo={pageInfo} />
        <ArticleContent article={article} />
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
  const blocks = await getPageContent(params.id);
  const pageInfo = await getPage(params.id);
  const posts = await getBlogOverview();

  const prevAndNext = prevAndNextHelper(posts, params.id);
  const article = await articleHelper(blocks);

  return {
    props: {
      article,
      pageInfo,
      prevAndNext,
    },
    revalidate: 120, // In seconds
  };
}

function prevAndNextHelper(posts, id) {
  // find prev and next post
  const i = posts.findIndex((post) => post.id === id);
  const prevAndNext = {};
  if (i === 0) {
    prevAndNext.next = null;
  } else {
    prevAndNext.next = posts[i - 1].id;
  }
  if (i === posts.length - 1) {
    prevAndNext.prev = null;
  } else {
    prevAndNext.prev = posts[i + 1].id;
  }
  return prevAndNext;
}

async function articleHelper(blocks) {
  const returnBlocks = [];
  for (const block of blocks) {
    if (block.type === "paragraph" && block.paragraph.rich_text.length) {
      returnBlocks.push({
        text: block.paragraph.rich_text[0].plain_text,
        type: "paragraph",
      });
    } else if (block.type === "divider") {
      returnBlocks.push({ type: "divider" });
    } else if (block.type === "image") {
      const response = await probe(block.image.external.url);
      returnBlocks.push({
        type: "image",
        src: block.image.external.url,
        alt: block.image.caption[0]?.plain_text ?? "no caption",
        caption: block.image.caption[0]?.plain_text ?? null,
        width: response.width,
        height: response.height,
      });
    }
  }
  return returnBlocks;
}
