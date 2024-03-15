import { apiSlice } from './apiSlice';
const PRODUCTS_URL = '/api/products';

export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllProducts: builder.query({
			query: () => ({
				url: `${PRODUCTS_URL}/`,
				method: 'GET'
			})
		}),
	})
});

export const { useGetAllProductsQuery } = productApiSlice;