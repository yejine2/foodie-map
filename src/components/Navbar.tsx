import Link from "next/link";
export default function Navbar() {
  return (
    <header className="hidden sm:block">
      <div className="navbar">
        <Link className="navbar__logo" href="/">
          FoodieMap
        </Link>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href="/stores/new" className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href="/users/likes" className="navbar__list--item">
            찜 스토어
          </Link>
          <Link href="/users/mypage" className="navbar__list--item">
            마이페이지
          </Link>
        </div>
      </div>
    </header>
  );
}
