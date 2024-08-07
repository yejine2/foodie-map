import { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery, InfiniteQueryObserverResult } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useDebounce from "@/hooks/useDebounce";
import { searchState } from "@/atom";
import { StoreType } from "@/interface";

// FetchStoresResponse 타입 정의
interface FetchStoresResponse {
  data: StoreType[];
  page: number;
}

// UseStoreList 훅의 반환 타입 정의
interface UseStoreListReturn {
  ref: React.RefObject<HTMLDivElement>;
  stores: InfiniteQueryObserverResult<FetchStoresResponse, unknown>["data"];
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  isError: boolean;
  isLoading: boolean;
}

export default function useStoreList(limit = 10): UseStoreListReturn {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const searchValue = useRecoilValue(searchState);
  const debouncedQ = useDebounce(searchValue?.q, 500); // 500ms 지연

  const searchParams = {
    q: debouncedQ,
    district: searchValue?.district,
  };

  const fetchStores = async ({
    pageParam = 1,
  }): Promise<FetchStoresResponse> => {
    const { data } = await axios.get("/api/stores", {
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
  } = useInfiniteQuery<FetchStoresResponse>(
    ["stores", searchParams],
    fetchStores,
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        return lastPage?.data.length === limit ? lastPage.page + 1 : undefined;
      },
    }
  );

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.error(res.error);
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

  return {
    ref,
    stores,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isError: !!isError,
    isLoading,
  };
}
