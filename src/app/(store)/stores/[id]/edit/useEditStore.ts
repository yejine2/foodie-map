import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { StoreType } from "@/interface";
import { toast } from "react-toastify";

interface UseEditStoreReturn {
  register: ReturnType<typeof useForm<StoreType>>["register"];
  handleSubmit: ReturnType<typeof useForm<StoreType>>["handleSubmit"];
  setValue: ReturnType<typeof useForm<StoreType>>["setValue"];
  errors: ReturnType<typeof useForm<StoreType>>["formState"]["errors"];
  isFetching: boolean;
  isError: boolean;
  onSubmit: (data: StoreType) => void;
}

export default function useEditStore(): UseEditStoreReturn {
  const router = useRouter();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StoreType>();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as StoreType;
  };

  const {
    data: store,
    isFetching,
    isError,
  } = useQuery<StoreType>(`store-${id}`, fetchStore, {
    onSuccess: (data) => {
      setValue("id", data.id);
      setValue("name", data.name);
      setValue("phone", data.phone);
      setValue("lat", data.lat);
      setValue("lng", data.lng);
      setValue("address", data.address);
      setValue("foodCertifyName", data.foodCertifyName);
      setValue("storeType", data.storeType);
      setValue("category", data.category);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const onSubmit = async (data: StoreType) => {
    try {
      const result: AxiosResponse<StoreType> = await axios.put(
        "/api/stores",
        data
      );
      if (result.status === 200) {
        toast.success("맛집을 수정했습니다.");
        router.replace(`/stores/${result.data.id}`);
      } else {
        toast.error("다시 시도해주세요");
      }
    } catch (e) {
      console.log(e);
      toast.error("데이터 수정 중 문제가 생겼습니다. 다시 시도해주세요.");
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    isFetching,
    isError,
    onSubmit,
  };
}
