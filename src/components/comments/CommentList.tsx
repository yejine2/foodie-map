/* eslint-disable @next/next/no-img-element */
import { CommentApiResponse } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

interface CommentListProps {
  comments?: CommentApiResponse;
  displayStore?: boolean;
}

export default function CommentList({
  comments,
  displayStore,
}: CommentListProps) {
  const { data: session, status } = useSession();

  const handleDeleteComment = async (id: number) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");

    if (confirm) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);

        if (result.status === 200) {
          toast.success("댓글을 삭제했습니다.");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="my-8">
      {comments?.data && comments?.data?.length > 0 ? (
        comments?.data?.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center space-x-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6"
          >
            <img
              src={comment?.user?.image || "/images/markers/default.png"}
              width={40}
              height={40}
              className="rounded-full bg-gray-10 h-10 w-10"
              alt="profile image"
            />
            <div className="flex flex-col space-y-1 flex-1">
              <div className="flex gap-2 items-center">
                <p className="text-black font-medium">
                  {comment?.user?.email
                    ? comment.user.email.split("@")[0]
                    : "익명의 유저"}
                </p>
                <p className="text-xs self-end">
                  {new Date(comment?.createdAt)?.toLocaleDateString()}
                </p>
              </div>
              <p className="text-black mt-2 text-sm">{comment.body}</p>
              {displayStore && comment.store && (
                <div className="mt-2">
                  <Link
                    href={`/stores/${comment.store.id}`}
                    className="text-gray-500 hover:text-gray-400 text-xs underline font-medium"
                  >
                    {comment.store.name}
                  </Link>
                </div>
              )}
            </div>
            <div>
              {comment.userId === session?.user.id && (
                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="underline text-gray-500 hover:text-gray-400"
                >
                  삭제
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 border border-gray-200 rounded-md text-sm text-gray-400">
          {status === "unauthenticated"
            ? "로그인 후 이용해주세요."
            : "댓글이 없습니다."}
        </div>
      )}
    </div>
  );
}
