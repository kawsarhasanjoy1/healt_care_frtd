import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    changePass: build.mutation({
      query: (data) => ({
        url: "auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    resetPassword: build.mutation({
      query: ({
        id,
        password,
        token,
      }: {
        id: string;
        password: string;
        token: string;
      }) => ({
        url: `auth/reset-password`,
        method: "POST",
        body: { id, password },
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePassMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
