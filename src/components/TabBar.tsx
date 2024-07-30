import { usePathname, useRouter } from "next/navigation";
import {
  BiUser,
  BiMapAlt,
  BiHeart,
  BiPlusCircle,
  BiHome,
} from "react-icons/bi";
import type { IconType } from "react-icons";

export default function TabBar() {
  return (
    <div className="flex w-full justify-between items-center h-[55px] fixed bottom-0 z-[100] border-t border-t-gray-200 bg-white md:hidden">
      <NavButton href="/" icon={BiHome} label="홈" />
      <NavButton href="/stores" icon={BiMapAlt} label="맛집 목록" />
      <NavButton href="/stores/new" icon={BiPlusCircle} label="맛집 등록" />
      <NavButton href="/users/likes" icon={BiHeart} label="찜 스토어" />
      <NavButton href="/users/mypage" icon={BiUser} label="마이페이지" />
    </div>
  );
}

type NavButtonType = {
  href: string;
  icon: IconType;
  label: string;
};

const NavButton = ({ href, icon: Icon, label }: NavButtonType) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;
  const textColor = isActive ? "text-blue-700" : "text-black/70";

  return (
    <button
      className={`flex flex-col items-center gap-1 basis-1/5 ${textColor}`}
      onClick={() => router.push(href)}
    >
      <Icon className="w-4 h-4" />
      <p className="text-xs text-center">{label}</p>
    </button>
  );
};
