import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (data) => ({
        url: "blogs/create-blog",
        method: "POST",
        body: data, 
      }),
      invalidatesTags: [tagTypes.blogs], 
    }),

    getAllBlogs: build.query({
      query: (arg: Record<string, any>) => ({
        url: "blogs",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.blogs],
    }),
    getSingleBlog: build.query({
      query: (id: string) => ({
        url: `blogs/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs]
    }),
  }),
});

export const { 
  useCreateBlogMutation, 
  useGetAllBlogsQuery, 
  useGetSingleBlogQuery 
} = blogApi;