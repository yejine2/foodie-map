import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { StoreType } from "@/interface";
import Loader from "@/components/Loader";
import { useState } from "react";
import Map from "@/components/Map";
import Marker from "@/components/Marker";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function StorePage() {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as StoreType;
  };

  const {
    data: store,
    isFetching,
    isSuccess,
    isError,
  } = useQuery(`store-${id}`, fetchStore, {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  if (isFetching) {
    return <Loader className="mt-[20%]" />;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between py-4">
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {store?.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {store?.address}
            </p>
          </div>
          {status === "authenticated" && (
            <div className="flex items-center gap-4 self-end">
              <Link
                className="underline hover:text-gray-400 text-sm text-gray-700"
                href={`/stores/${store?.id}/edit`}
              >
                수정
              </Link>
              <button
                type="button"
                className="underline hover:text-gray-400 text-sm text-gray-700"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <StoreInfoItem title="카테고리" value={store?.category} />
            <StoreInfoItem title="주소" value={store?.address} />
            <StoreInfoItem title="위도" value={store?.lat} />
            <StoreInfoItem title="경도" value={store?.lng} />
            <StoreInfoItem title="연락처" value={store?.phone} />
            <StoreInfoItem
              title="식품인증구분"
              value={store?.foodCertifyName}
            />
            <StoreInfoItem title="업종명" value={store?.storeType} />
          </dl>
        </div>
      </div>
      {isSuccess && (
        <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]">
          <Map lat={store?.lat} lng={store?.lng} zoom={1} />
          <Marker store={store} />
        </div>
      )}
    </>
  );
}

const StoreInfoItem = ({
  title,
  value = "정보 없음",
}: {
  title: string;
  value?: string | null;
}) => (
  <div className="px-0 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium leading-6 text-gray-900">{title}</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      {value}
    </dd>
  </div>
);
