import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        initPayment: build.mutation({
            query: (id) => ({
                url: `payments/init-payment/${id}`,
                method: 'POST'
            })
        })
    })
})


export const {useInitPaymentMutation} = paymentApi;