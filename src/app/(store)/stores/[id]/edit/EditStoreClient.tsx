"use client";

import AddressSearch from "@/components/AddressSearch";
import Loader from "@/components/Loader";
import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from "@/data/store";
import useEditStore from "./useEditStore";

export default function EditStoreClient() {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isFetching,
    isError,
    onSubmit,
  } = useEditStore();

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
    <form
      className="px-4 md:max-w-3xl mx-auto py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            맛집 수정
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            아래 내용을 입력해서 맛집을 수정해주세요
          </p>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                가게명
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.name?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                카테고리
              </label>
              <div className="mt-2">
                <select
                  {...register("category", { required: true })}
                  className="block w-full rounded-md border-0 px-2 outline-none py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">카테고리 선택</option>
                  {CATEGORY_ARR?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors?.category?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                연락처
              </label>
              <div className="mt-2">
                <input
                  {...register("phone", { required: true })}
                  className="block w-full rounded-md border-0 outline-none px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.phone?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>
            <AddressSearch
              setValue={setValue}
              register={register}
              errors={errors}
            />
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                식품인증구분
              </label>
              <div className="mt-2">
                <select
                  {...register("foodCertifyName", { required: true })}
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">식품인증구분 선택</option>
                  {FOOD_CERTIFY_ARR?.map((data) => (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
                {errors?.foodCertifyName?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="storeType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                업종구분
              </label>
              <div className="mt-2">
                <select
                  {...register("storeType", { required: true })}
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">업종구분 선택</option>
                  {STORE_TYPE_ARR?.map((data) => (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
                {errors?.storeType?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-blue-700 hover:bg-blue-600 p-3 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        수정하기
      </button>
    </form>
  );
}
