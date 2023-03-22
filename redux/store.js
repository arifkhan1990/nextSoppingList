import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import itemSlice from './slice/itemSlice';
import userSlice from './slice/userSlice';
import { shoppingApi } from './services/shoppingApi';
export const store = configureStore({
  reducer: {
    [shoppingApi.reducerPath]: shoppingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shoppingApi.middleware),
});

setupListeners(store.dispatch);
