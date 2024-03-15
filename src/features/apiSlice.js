import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://campus-cafe.onrender.com' });

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ['User'],
	endpoints: (builder) => ({})
})