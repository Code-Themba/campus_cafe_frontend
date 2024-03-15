import { apiSlice } from './apiSlice';

const USER_URL = '/api/account';

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/login`,
				method: 'POST',
				body: data,
			})
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USER_URL}/logout`,
				method: 'POST',
			}) 
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/register`,
				method: 'POST',
				body: data
			}),
		}),
	})
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = userApiSlice;