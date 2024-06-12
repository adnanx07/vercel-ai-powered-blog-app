"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import useFetchRemoteData from "@/hooks/useFetchRemoteData";

const BlogLayout = ({ children }) => {
  const { getBlogById } = useFetchRemoteData();
  const param = useParams();
  const { blog: blogId } = param;

  const [blog, setBlog] = useState({
    title: "",
    body: "",
  });

  const fetchBlogData = async () => {
    try {
      const { data } = await getBlogById(blogId);
      setBlog(data);
    } catch (error) {
      throw new Error(error.message || "something went wrong");
    }
  };

  const renderBlog = (blog) => {
    const { title, body } = blog;
    return (
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p>{body}</p>
      </div>
    );
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <div>
      <Link href="/" className="flex gap-1 text-underline text-blue-400">
        <Home size={22} /> Home{" "}
        <span className="flex cursor-auto text-slate-400">
          <ChevronRight /> {blog?.id}
        </span>
      </Link>
      <div className="mb-3">{renderBlog(blog)}</div>
      {children}
    </div>
  );
};

export default BlogLayout;
