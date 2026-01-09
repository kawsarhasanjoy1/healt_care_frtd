import { baseApi } from "./baseApi";

const patiantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query({
      query: () => ({
        url: "/patients",
        method: "GET"
      }),
    }),
    updatePatient: builder.mutation({
      query: ({id,payload}) => ({
        url: `/patients/${id}`,
        method: "PATCH",
        body: payload
      }),
    }),
  }),
});

export const { useGetPatientQuery , useUpdatePatientMutation} = patiantApi;