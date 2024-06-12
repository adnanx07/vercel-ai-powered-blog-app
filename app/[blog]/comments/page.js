import { CircleUserRound } from "lucide-react";
import useFetchRemoteData from "@/hooks/useFetchRemoteData";

export default async function Comment({ params: { blog: blogId } }) {
  const { getCommentsByPost } = useFetchRemoteData();
  const { data: commentList } = await getCommentsByPost(blogId);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold mb-4">{commentList.length} Comments</h3>
      <div className="divide-y">
        {commentList?.map(({ email, body }) => (
          <div key={email} className="flex items-start py-4">
            <CircleUserRound size={48} className="text-gray-600" />
            <div className="ml-4">
              <div className="flex items-center mb-1">
                <b className="text-gray-800">{email}</b>
              </div>
              <p className="text-gray-700">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
