import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const patiantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query({
      query: () => ({
        url: "patients",
        method: "GET",
      }),
      providesTags:[tagTypes.patients]
    }),
    updatePatient: builder.mutation({
      query: ({ id, payload }) => ({
        url: `patients/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [tagTypes.patients]
    }),
    upPatiantDonorStatus: builder.mutation<any, void>({
      query: () => ({
        url: `patients/donor-status`,
        method: "PUT",
      }),
      invalidatesTags: [tagTypes.patients]
    }),
  }),
});

export const {
  useGetPatientQuery,
  useUpdatePatientMutation,
  useUpPatiantDonorStatusMutation,
} = patiantApi;
