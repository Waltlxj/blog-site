import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/blog">Blog 杂文</Link>
        </li>
        <li className="navbar-item">
          <Link href="/gallery">Gallery 相册</Link>
        </li>
      </ul>
    </nav>
  );
}
