/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from "next-auth/react";

interface InfoRowProps {
  label: string;
  content: React.ReactNode;
}

export default function Mypage() {
  const { data: session } = useSession();

  return (
    <div className="md:max-w-5xl px-4 mx-auto py-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          마이페이지
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          사용자 기본정보
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <InfoRow label="이름" content={session?.user.name ?? "사용자"} />
          <InfoRow
            label="이메일"
            content={session?.user.email ?? "이메일 정보가 없습니다."}
          />
          <InfoRow
            label="이미지"
            content={
              <img
                width={48}
                height={48}
                className="rounded-full aspect-square"
                alt="프로필 이미지"
                src={session?.user.image ?? "/images/markers/default.png"}
              />
            }
          />
          <InfoRow
            label="설정"
            content={
              <button
                type="button"
                className="underline"
                onClick={() => signOut()}
              >
                로그아웃
              </button>
            }
          />
        </dl>
      </div>
    </div>
  );
}

const InfoRow = ({ label, content }: InfoRowProps) => (
  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium leading-6 text-gray-900">{label}</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      {content}
    </dd>
  </div>
);
