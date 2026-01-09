import { baseApi } from "./baseApi";

const metaApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMetaData : build.query({
            query: () => ({
                url: "meta-data",
                method: "GET"
            })
        })
    })
})


export const {useGetMetaDataQuery} = metaApi;