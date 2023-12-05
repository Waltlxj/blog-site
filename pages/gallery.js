import Head from "next/head";
import Image from "next/image";
import PhotoAlbum from "react-photo-album";
import NavBar from "../components/NavBar";
import styles from "../styles/Gallery.module.css";

function NextJsImageInAlbum({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}) {
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Image
        fill
        src={photo}
        priority={photo.priority}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        {...{ alt, title, sizes, className, onClick }}
      />
    </div>
  );
}

export default function GalleryPage({ photos }) {
  return (
    <div className="page">
      <Head>
        <title>Walt Li | Gallery</title>
      </Head>

      <div className={styles.frontpage}>
        <NavBar loc="gallery" />
      </div>
      <div className={styles.gallery}>
        <PhotoAlbum
          layout="rows"
          photos={photos}
          spacing={4}
          renderPhoto={NextJsImageInAlbum}
          sizes={{ size: "calc(100vw - 8px)" }}
          targetRowHeight={(containerWidth) => {
            if (containerWidth > 960) return containerWidth / 4;
            return 240;
          }}
        />
      </div>
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
