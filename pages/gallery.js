import Head from "next/head";
import Gallery from "react-photo-gallery-next";
import NavBar from "../components/NavBar";
import styles from "../styles/Gallery.module.css";

export default function GalleryPage({ photos }) {
  return (
    <div className="page">
      <Head>
        <title>Walt Li | Gallery</title>
      </Head>

      <div className={styles.frontpage}>
        <NavBar loc="gallery" />
      </div>

      <Gallery photos={photos} />
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://api.npoint.io/b56e47e2ddc804e9cfd4");
  const data = await response.json();
  const photos = data.photos;

  return {
    props: {
      photos,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 120, // In seconds
  };
}
