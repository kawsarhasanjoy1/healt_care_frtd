import { baseApi } from "./baseApi";

const bloodRequest = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBloodRequest: build.mutation({
      query: (data) => ({
        url: "blood-request/create-blood-request",
        method: "POST",
        body: data,
      }),
    }),
    getIncomingBloodRequest: build.query({
      query: () => ({
        url: "blood-request/incoming-blood-request",
        method: "GET",
      }),
    }),
    getMySentRequest: build.query({
      query: () => ({
        url: "blood-request/my-request",
        method: "GET",
      }),
    }),
    upBloodRequestStatus: build.mutation({
      query: ({ requestId, status }) => ({
        url: `blood-request/status/${requestId}`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useCreateBloodRequestMutation,
  useGetIncomingBloodRequestQuery,
  useUpBloodRequestStatusMutation,
  useGetMySentRequestQuery
} = bloodRequest;
