import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const doctorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: (query) => {
        const params = new URLSearchParams(query).toString()
        return {
        url: `doctors?${params}`,
        method: "GET",
      }
      },
      providesTags: [tagTypes.doctors]
    }),
    getDoctor: builder.query({
      query: (id) => {
        return {
        url: `doctors/${id}`,
        method: "GET",
      }
      },
      providesTags: [tagTypes.doctors]
    }),
    createDoctors: builder.mutation({
      query: (data) => ({
        url: `user/create-doctor`,
        method: "POST",
        body: data
      })
    }), 
    upDoctors: builder.mutation({
      query: ({id,values}) => ({
        url: `doctors/${id}`,
        method: "PATCH",
        body: values
      }),
      invalidatesTags: [tagTypes.doctors]
    }), 
    softDeleteDoctor: builder.mutation({
      query: (id) => ({
        url: `doctors/${id}/soft-delete`,
        method: "PATCH"
      }),
      invalidatesTags: [tagTypes.doctors]
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDoctorsQuery,
  useGetDoctorQuery,
  useCreateDoctorsMutation,
  useUpDoctorsMutation,
  useSoftDeleteDoctorMutation,
} = doctorsApi;