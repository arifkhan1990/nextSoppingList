import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shoppingApi = createApi({
  reducerPath: 'shoppingApi', 
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  tagTypes: ['Item', 'User'],
  endpoints: (builder) => ({}),
});
