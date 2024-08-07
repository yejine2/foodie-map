import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { StoreType } from "@/interface";

interface UseNewStoreReturn {
  register: ReturnType<typeof useForm<StoreType>>["register"];
  handleSubmit: ReturnType<typeof useForm<StoreType>>["handleSubmit"];
  setValue: ReturnType<typeof useForm<StoreType>>["setValue"];
  errors: ReturnType<typeof useForm<StoreType>>["formState"]["errors"];
  onSubmit: (data: StoreType) => void;
}

export default function useNewStore(): UseNewStoreReturn {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StoreType>();

  const onSubmit = async (data: StoreType) => {
    try {
      const result: AxiosResponse<StoreType> = await axios.post(
        "/api/stores",
        data
      );
      if (result.status === 200) {
        toast.success("맛집을 등록했습니다.");
        router.replace(`/stores/${result.data.id}`);
      } else {
        toast.error("다시 시도해주세요");
      }
    } catch (e) {
      console.log(e);
      toast.error("데이터 생성 중 문제가 생겼습니다. 다시 시도해주세요.");
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    onSubmit,
  };
}
