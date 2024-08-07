import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { StoreType } from "@/interface";
import { toast } from "react-toastify";

interface UseStoreDetailReturn {
  store: StoreType | undefined;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  handleDelete: () => void;
  page: string | null;
}

export default function useStoreDetail(): UseStoreDetailReturn {
  const router = useRouter();
  const { id } = useParams();

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as StoreType;
  };

  const {
    data: store,
    isFetching,
    isSuccess,
    isError,
  } = useQuery<StoreType>(`store-${id}`, fetchStore, {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const handleDelete = async () => {
    const confirm = window.confirm("해당 가게를 삭제하시겠습니까?");

    if (confirm && store) {
      try {
        const result = await axios.delete(`/api/stores?id=${store?.id}`);

        if (result.status === 200) {
          toast.success("가게를 삭제했습니다.");
          router.replace("/");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (e) {
        console.log(e);
        toast.error("다시 시도해주세요.");
      }
    }
  };

  return {
    store,
    isFetching,
    isSuccess,
    isError,
    handleDelete,
    page,
  };
}
