import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <div className="navItem">
        <Link href="/">HOME</Link>
      </div>
      <div>
        <h1>BLOG</h1>
      </div>
      <div className="navItem">
        <Link href="/gallery">GALLERY</Link>
      </div>
    </nav>
  );
}
