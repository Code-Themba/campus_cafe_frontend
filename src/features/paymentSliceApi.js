import { apiSlice } from './apiSlice';
const PAYMENT_URL = '/api';

export const paymentSliceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        makePayment: builder.mutation({
            query: (data) => ({
                url: `${PAYMENT_URL}/create-checkout-session`,
                method: 'POST',
                body: data,
            })
        })
    })
});

export default PAYMENT_URL
export const { useMakePaymentMutation } = paymentSliceApi;