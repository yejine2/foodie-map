"use client";

import React from "react";
import useLikes from "./useLikes";
import Loading from "@/components/Loading";
import StoreList from "@/components/StoreList";
import Pagination from "@/components/Pagination";
import { LikeType } from "@/interface";

export default function LikesClient() {
  const { likes, isLoading, isError, isSuccess, page } = useLikes();

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <h3 className="text-lg font-semibold">찜</h3>
      <div className="mt-1 text-gray-500 text-sm">찜한 가게 리스트입니다.</div>
      <ul role="list" className="divide-y divide-gray-100 mt-6">
        {isLoading ? (
          <Loading />
        ) : (
          likes?.data?.map((like: LikeType, index: number) => (
            <StoreList i={index} store={like.store} key={index} />
          ))
        )}
        {isSuccess && !likes?.data?.length && (
          <div className="p-4 border border-gray-200 rounded-md text-sm text-gray-400">
            찜한 가게가 없습니다.
          </div>
        )}
      </ul>
      <Pagination
        total={likes?.totalPage}
        page={page}
        pathname="/users/likes"
      />
    </div>
  );
}
