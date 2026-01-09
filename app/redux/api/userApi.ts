import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPatient: builder.mutation({
      query: (data) => ({
        url: "/user/create-patient",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getUser: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query && typeof query === "object") {
          Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              params.append(key, String(value));
            }
          });
        }

        const qs = params.toString();

        return {
          url: qs ? `/user?${qs}` : "/user",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/user/get-me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user], // ✅ comma issue fixed
    }),
  }),
});

export const {
  useCreatePatientMutation,
  useGetUserQuery,
  useGetMeQuery,
  useUpdateMyProfileMutation,
} = userApi;