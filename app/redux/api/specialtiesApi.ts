import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSpecialty: builder.mutation({
      query: (data) => ({
        url: "specialties/create-specialties",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.specialties]
    }),

    getSpecialties: builder.query({
      query: (query) => {
        const params = new URLSearchParams(query).toString()
        return {
        url: `specialties?${params}`,
        method: "GET",
      }
      },
      providesTags: [tagTypes.specialties]
    }),
    deleteSpecialty: builder.mutation({
      query: (id) => ({
        url: `specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialties]
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateSpecialtyMutation,
  useGetSpecialtiesQuery,
  useDeleteSpecialtyMutation
} = specialtiesApi;