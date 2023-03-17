import Link from "next/link";

export default function NavBar({ loc }) {
  if (loc === "gallery") {
    return (
      <nav>
        <div className="navItem navItemMargin">
          <Link href="/">HOME</Link>
        </div>
        <div>
          <h1>PHOTOS</h1>
        </div>
        <div className="navItem navItemMargin">
          <Link href="/blog">BLOG</Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav>
        <div className="navItem navItemMargin">
          <Link href="/">HOME</Link>
        </div>
        <div>
          <h1>BLOG</h1>
        </div>
        <div className="navItem navItemMargin">
          <Link href="/gallery">PHOTOS</Link>
        </div>
      </nav>
    );
  }
}
