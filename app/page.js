import { MessageCircleMore, Sparkles } from "lucide-react";
import RoundedIcon from "@/components/Icon/RoundedIcon";
import useFetchRemoteData from "@/hooks/useFetchRemoteData";

export default async function Home() {
  const { getAllBlogPosts } = useFetchRemoteData();
  const { data: blogs } = await getAllBlogPosts();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>
        <div className="space-y-4">
          {blogs?.map(({ id, title, body }) => (
            <div
              key={id}
              className="flex p-6 bg-white justify-between shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">{body}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <RoundedIcon to={`/${id}/comments`} icon={<MessageCircleMore />} title="View Comments" />
                <RoundedIcon to={`/${id}/chat`} icon={<Sparkles />} title="Summarize with AI" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
