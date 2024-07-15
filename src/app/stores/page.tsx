"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

import { StoreType } from "@/interface";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loading from "@/components/Loading";
import Loader from "@/components/Loader";
import SearchFilter from "@/components/SearchFilter";
import StoreList from "@/components/StoreList";
import useDebounce from "@/hooks/useDebounce";
import { searchState } from "@/atom";
import { useRecoilValue } from "recoil";

export default function StoreListPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const searchValue = useRecoilValue(searchState);
  const debouncedQ = useDebounce(searchValue?.q, 500); // 500ms 지연
  const limit = 10;

  // 검색어, 선택 지역
  const searchParams = {
    q: debouncedQ,
    district: searchValue?.district,
  };

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores?page=" + pageParam, {
      params: {
        limit,
        page: pageParam,
        ...searchParams,
      },
    });

    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(["stores", searchParams], fetchStores, {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.length === limit ? lastPage.page + 1 : undefined;
    },
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

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
                page.data.map((store: StoreType, i: number) => (
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
