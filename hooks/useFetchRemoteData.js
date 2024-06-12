import { ENV_CONFIG } from "@/constants";
import axios from "axios";

export default function useFetchRemoteData() {
  const getAllBlogPosts = async () => {
    try {
      const data = await axios(`${ENV_CONFIG.APP.JSON_PLACEHOLDER_BASE_URL}/posts`);
      return data;
    } catch (error) {
      throw new Error(error || "something went wrong");
    }
  };

  const getBlogById = async (id) => {
    try {
      const data = await axios(`${ENV_CONFIG.APP.JSON_PLACEHOLDER_BASE_URL}/posts/${id}`);
      return data;
    } catch (error) {
      throw new Error(error || "something went wrong");
    }
  };

  const getCommentsByPost = async (postId) => {
    try {
      const data = await axios(`${ENV_CONFIG.APP.JSON_PLACEHOLDER_BASE_URL}/comments?postId=${postId}`);
      return data;
    } catch (error) {
      throw new Error(error || "something went wrong");
    }
  };

  return {
    getAllBlogPosts,
    getBlogById,
    getCommentsByPost
  };
}
