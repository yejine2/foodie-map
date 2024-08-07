import { Suspense } from "react";
import MyPageClient from "./MyPageClient";
import Loading from "@/components/Loading";

const MyPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MyPageClient />;
    </Suspense>
  );
};

export default MyPage;
