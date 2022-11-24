import Head from "next/head";
import NavBar from "../components/NavBar";

export default function Gallery() {
  return (
    <div className="page">
      <Head>
        <title>Walt Li | Gallery</title>
      </Head>
      <NavBar />
      <h2>Photos</h2>
    </div>
  );
}
