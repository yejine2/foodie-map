import { QueryObserverResult, useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { CommentApiResponse } from "@/interface";

interface UseFetchCommentsParams {
  storeId?: number;
  user?: boolean;
}

interface UseFetchCommentsReturn {
  comments: CommentApiResponse | undefined;
  refetch: () => Promise<QueryObserverResult<CommentApiResponse, unknown>>;
  isLoading: boolean;
  isError: boolean;
  page: string;
}

export default function useFetchComments({
  storeId,
  user,
}: UseFetchCommentsParams): UseFetchCommentsReturn {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const fetchComments = async (): Promise<CommentApiResponse> => {
    let url = `/api/comments?limit=5&page=${page}`;
    if (storeId) {
      url += `&storeId=${storeId}`;
    }
    if (user) {
      url += `&user=true`;
    }

    const { data }: AxiosResponse<CommentApiResponse> = await axios.get(url);
    return data;
  };

  const {
    data: comments,
    isLoading,
    isError,
    refetch,
  } = useQuery<CommentApiResponse>(
    [`comments-${page}`, storeId, user],
    fetchComments
  );

  return { comments, isLoading, isError, page, refetch };
}
