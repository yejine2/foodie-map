import { Suspense } from "react";
import LikesClient from "./LikesClient";
import Loading from "@/components/Loading";

const LikesPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LikesClient />;
    </Suspense>
  );
};

export default LikesPage;
