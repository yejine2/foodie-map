import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { LikeApiResponse } from "@/interface";

interface UseLikesReturn {
  likes: LikeApiResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  page: string;
}

export default function useLikes(): UseLikesReturn {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const fetchLikes = async (): Promise<LikeApiResponse> => {
    const { data }: AxiosResponse<LikeApiResponse> = await axios.get(
      `/api/likes?limit=10&page=${page}`
    );
    return data;
  };

  const {
    data: likes,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<LikeApiResponse>(`likes-${page}`, fetchLikes);

  return { likes, isLoading, isError, isSuccess, page };
}
