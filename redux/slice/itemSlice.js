import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

import { shoppingApi } from '../../redux/services/shoppingApi';

const initialState = {
  items: [],
  isLoading: false,
  error: false,
};

export const itemApiSlice = shoppingApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => '/api/items',
      providesTags: ['Item'],
    }),
    getItem: builder.query({
      query: (itemId) => `/api/items/${itemId}`,
      providesTags: ['Item'],
    }),
    addItem: builder.mutation({
      query: (initialItem) => ({
        url: '/api/items',
        method: 'POST',
        body: {
          ...initialItem,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Item' }],
    }),
    updateItem: builder.mutation({
      query: (initialItem, itemId) => ({
        url: `/api/items?itemId=${itemId}`,
        method: 'PUT',
        body: {
          ...initialItem,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Item' }],
    }),
    deleteItem: builder.mutation({
      query: ({ id }) => ({
        url: `/api/items/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Item' }],
    }),
    // addReaction: builder.mutation({
    //     query: ({ postId, reactions }) => ({
    //         url: `posts/${postId}`,
    //         method: 'PATCH',
    //         // In a real app, we'd probably need to base this on user ID somehow
    //         // so that a user can't do the same reaction more than once
    //         body: { reactions }
    //     }),
    //     async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
    //         // `updateQueryData` requires the endpoint name and cache key arguments,
    //         // so it knows which piece of cache state to update
    //         const patchResult = dispatch(
    //             extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
    //                 // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
    //                 const post = draft.entities[postId]
    //                 if (post) post.reactions = reactions
    //             })
    //         )
    //         try {
    //             await queryFulfilled
    //         } catch {
    //             patchResult.undo()
    //         }
    //     }
    // })
  }),
});

export const {
  useGetItemsQuery,
  useGetItemQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,

  // useAddReactionMutation
} = itemApiSlice;
