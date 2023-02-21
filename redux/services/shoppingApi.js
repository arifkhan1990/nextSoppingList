import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shoppingApi = createApi({
  reducerPath: 'shoppingApi', // optional
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Item', 'User'],
  endpoints: (builder) => ({}),
});
