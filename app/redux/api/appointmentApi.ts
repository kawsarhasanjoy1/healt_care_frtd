import { baseApi } from "./baseApi";

const appoinmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAppoinment: build.mutation({
            query: (data) => ({
                url: "appoinment",
                method: 'POST',
                body: data
            })
        }),
        getMyAppoinment: build.query({
            query: (query) => {
                const params = new URLSearchParams(query).toString()
                return {
                url: `appoinment/my-appoinment?${params}`,
                method: 'GET'
            }
            }
        })
    })
})


export const {useCreateAppoinmentMutation ,useGetMyAppoinmentQuery} = appoinmentApi;