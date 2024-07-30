"use client";

import { mapState } from "@/atom";
import { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import FullPageLoader from "./FullPageLoader";

export default function CurrentLocationButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const map = useRecoilValue(mapState);

  const handleCurrentPosition = () => {
    setLoading(true);

    const options = {
      enableHighAccuracy: false, // 위치 정확도
      timeout: 5000,
      maximumAge: Infinity, // 캐싱처리
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        // success
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success("현재 위치로 이동되었습니다.");
          }

          return currentPosition;
        },
        // error
        () => {
          toast.error("현재 위치를 가져올 수 없습니다.");
          setLoading(false);
        },
        options
      );
    }
  };

  return (
    <>
      {loading && <FullPageLoader />}
      <button
        type="button"
        onClick={handleCurrentPosition}
        className="fixed z-10 flex p-2 gap-1 items-center shadow-3xl right-4 bottom-10 mb-10 md:mb-0 bg-white rounded-full hover:bg-blue-200 border-gray-100 border"
      >
        <MdOutlineMyLocation className="w-5 h-5 text-blue-400" />
      </button>
    </>
  );
}
