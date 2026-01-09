import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createReview: build.mutation({
            query: (data) => ({
                url: 'reivew',
                method:"POST",
                body: data
            }),
            invalidatesTags:[tagTypes.review]
        }),
        getReview: build.query({
            query: () => ({
                url: 'reivew',
                method:"GET",
            }),
            providesTags: [tagTypes.review]
        }),
        getMyReview: build.query({
            query: () => ({
                url: 'reivew/my-review',
                method:"GET",
            }),
            providesTags: [tagTypes.review]
        }),
        getDoctorReview: build.query({
            query: () => ({
                url: 'reivew/doctor-review',
                method:"GET",
            }),
            providesTags: [tagTypes.review]
        })
    })
})


export const {useCreateReviewMutation,useGetReviewQuery,useGetMyReviewQuery, useGetDoctorReviewQuery} = reviewApi;