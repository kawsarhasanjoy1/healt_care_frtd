import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const prescriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPrescription: builder.mutation({
      query: (data) => ({
        url: "prescription",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.prescription]
    }),

    getPrescription: builder.query({
      query: (query) => {
        const params = new URLSearchParams(query).toString()
        return {
        url: `prescription/my-prescription?${params}`,
        method: "GET",
      }
      },
      providesTags: [tagTypes.prescription]
    }),
   
  }),
  overrideExisting: false,
});

export const {
 useCreatePrescriptionMutation,
 useGetPrescriptionQuery
} = prescriptionApi;