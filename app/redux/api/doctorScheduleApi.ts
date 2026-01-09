import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const doctorScheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctorSchedule: builder.mutation({
      query: (data) => ({
        url: "doctor-schedules",
        method: "POST",
        body: data,
      }),
     invalidatesTags: [tagTypes.doctorSchedule]
    }),
     getMySchedule: builder.query({
          query: (query) => {
            const params = new URLSearchParams(query)
            return {
            url: `doctor-schedules/my-schedule?${params}`,
            method: "GET",
          }
          },
          providesTags: [tagTypes.doctorSchedule]
    }),

    getAllDoctorSchedule: builder.query({
      query: (params) => {
        const query = new URLSearchParams(params)
        return {
        url: `doctor-schedules?${query}`,
        method: 'GET',
      }
      }
    })
  }),
  overrideExisting: false,
});

export const {
useCreateDoctorScheduleMutation,
useGetMyScheduleQuery,
useGetAllDoctorScheduleQuery
} = doctorScheduleApi