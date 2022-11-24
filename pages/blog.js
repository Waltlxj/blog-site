import Head from "next/head";

import NavBar from "../components/NavBar";

export default function Blog() {
  return (
    <div className="page">
      <Head>
        <title>Walt Li | Blog</title>
      </Head>
      <header>
        <h1> Xiongju Li (Walt) </h1>
      </header>
      <NavBar />

      <h2>Blog</h2>
    </div>
  );
}
