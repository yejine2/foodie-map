"use client";

import React from "react";
import useStoreList from "./useStoreList";
import Loading from "@/components/Loading";
import Loader from "@/components/Loader";
import SearchFilter from "@/components/SearchFilter";
import StoreList from "@/components/StoreList";

export default function StoreListClient() {
  const {
    ref,
    stores,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useStoreList();

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-4 md:py-8">
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.length > 0 && !isLoading ? (
                page.data.map((store, i) => (
                  <StoreList store={store} i={i} key={i} />
                ))
              ) : (
                <p className="text-sm text-center my-20 text-gray-500">
                  검색 결과가 없습니다.
                </p>
              )}
            </React.Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}
