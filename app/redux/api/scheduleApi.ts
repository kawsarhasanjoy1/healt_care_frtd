import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: (data) => ({
        url: "schedules",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.schedules]
    }),

    getSchedule: builder.query({
      query: (query) => {
        const params = new URLSearchParams(query).toString()
        return {
        url: `schedules?${params}`,
        method: "GET",
      }
      },
      providesTags: [tagTypes.schedules]
    }),
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `schedules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedules]
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateScheduleMutation,
  useGetScheduleQuery,
  useDeleteScheduleMutation,
} = scheduleApi;