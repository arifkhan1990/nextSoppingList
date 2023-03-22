
import { shoppingApi } from '../../redux/services/shoppingApi';

export const userApiSlice = shoppingApi.injectEndpoints({

  endpoints: (builder) => ({
    getUsersInfo: builder.query({
      query: () => '/api/users',
      providesTags: ['User'],
    }),


    getUserInfo: builder.query({
      query: (userId) => `/api/users/${userId}`,
      providesTags: ['User'],
    }),


    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: '/api/users/register',
        method: 'POST',
        body: {
          ...userInfo,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg._id }],
    }),


    userLogin: builder.mutation({
      query: (loginInfo) => ({
          url: '/api/users/login',
          method: 'POST',
          body: { ...loginInfo },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg._id }],
  }),


    updateUserInfo: builder.mutation({
      query: ({userInfo, userId}) => ({
        url: `/api/users?userId=${userId}`,
        method: 'PUT',
        body: { 
           ...userInfo,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg._id }],
    }),


    deleteUserInfo: builder.mutation({
      query: ({ id }) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg._id }],
    }),
  })
});

export const {
  useGetUsersInfoQuery,
  useGetUserInfoQuery,
  useRegisterUserMutation,
  useDeleteUserInfoMutation,
  useUpdateUserInfoMutation,
  useUserLoginMutation,

} = userApiSlice;
