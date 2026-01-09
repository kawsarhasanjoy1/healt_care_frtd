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
    invalidatesTags: [tagTypes.auth]
  }),
  forgotPassword: build.mutation({
    query: (data) => ({
      url: "auth/forgot-password",
      method: "POST",
      body: data,
    }),
    invalidatesTags: [tagTypes.auth]
  }),

  
})
})

export const {useLoginMutation, useChangePassMutation, useForgotPasswordMutation} = authApi;