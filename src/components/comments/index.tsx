/* eslint-disable @next/next/no-img-element */
import useFetchComments from "@/hooks/useFetchComments";
import { useSession } from "next-auth/react";
import Pagination from "../Pagination";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentProps {
  storeId: number;
  page?: string;
}

export default function Comments({ storeId, page = "" }: CommentProps) {
  const { status } = useSession();
  const { comments, refetch } = useFetchComments({ storeId });

  return (
    <div className="md:max-w-2xl py-8 px-4 mb-20 mx-auto">
      <h3 className="text-lg font-semibold">댓글</h3>
      {status === "authenticated" && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      <CommentList comments={comments} />
      <Pagination
        total={comments?.totalPage}
        page={page}
        pathname={`/stores/${storeId}`}
      />
    </div>
  );
}
