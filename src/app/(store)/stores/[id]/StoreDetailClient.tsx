"use client";

import React from "react";
import useStoreDetail from "./useStoreDetail";
import Loader from "@/components/Loader";
import Map from "@/components/Map";
import Marker from "@/components/Marker";
import Link from "next/link";
import Like from "@/components/Like";
import Comments from "@/components/comments";
import { useSession } from "next-auth/react";

export default function StoreDetailClient() {
  const { status } = useSession();
  const { store, isFetching, isSuccess, isError, handleDelete, page } =
    useStoreDetail();

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
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between py-4">
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {store?.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {store?.address}
            </p>
          </div>
          {status === "authenticated" && store && (
            <div className="flex items-center gap-4 self-end">
              {<Like storeId={store.id} />}
              <Link
                className="underline hover:text-gray-400 text-sm text-gray-700"
                href={`/stores/${store?.id}/edit`}
              >
                수정
              </Link>
              <button
                type="button"
                onClick={handleDelete}
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
            <StoreInfoItem title="연락처" value={store?.phone} />
            <StoreInfoItem
              title="식품인증구분"
              value={store?.foodCertifyName}
            />
            <StoreInfoItem title="업종명" value={store?.storeType} />
          </dl>
        </div>
      </div>
      {isSuccess && store && (
        <>
          <div className="overflow-hidden w-full mx-auto max-h-[200px] max-w-2xl px-4">
            <Map lat={store?.lat} lng={store?.lng} zoom={3} />
            <Marker store={store} />
          </div>
          <Comments storeId={String(store.id)} page={page ?? "1"} />
        </>
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
