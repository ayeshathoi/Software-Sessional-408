// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    // other reducers...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
