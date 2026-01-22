"use client";
import BlogDetails from "@/app/component/Home/Blog/BlogDetails";
import Loading from "@/app/loading/page";
import { useGetSingleBlogQuery } from "@/app/redux/api/blogApi";
import { useParams } from "next/navigation";

const BlogDetailsPage = () => {
  const params = useParams();
  const blogId = params?.blogId as string;
  const { data: blog, isLoading } = useGetSingleBlogQuery(blogId);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <BlogDetails blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
