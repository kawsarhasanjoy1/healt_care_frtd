import { baseApi } from "./baseApi";

const doctorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: (query) => {
        const params = new URLSearchParams(query).toString()
        return {
        url: `admin?${params}`,
        method: "GET",
      }
      }
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: `user/create-admin`,
        method: "POST",
        body: data
      })
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminsQuery,
  useCreateAdminMutation
} = doctorsApi;