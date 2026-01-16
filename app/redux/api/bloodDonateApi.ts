import { baseApi } from "./baseApi";

const bloodDonateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBloodDanate: build.mutation({
      query: (data) => ({
        url: "blood-donate/create-blood-donate",
        method: "POST",
        body: data,
      }),
    }),
    getAvailableDonors: build.query({
      query: () => ({
        url: "blood-donate/available-donors",
        method: "GET",
      }),
    }),
    myBloodDonation: build.query({
      query: () => ({
        url: "blood-donate/my-blood-donation",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateBloodDanateMutation, useGetAvailableDonorsQuery, useMyBloodDonationQuery } = bloodDonateApi;
