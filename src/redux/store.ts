import { userApi } from './services/userApi';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    counterReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>; // {counterReducer: number}
export type AppDispatch = typeof store.dispatch; // Dispatch
