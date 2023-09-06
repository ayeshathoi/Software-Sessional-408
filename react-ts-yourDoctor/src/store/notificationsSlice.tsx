// src/store/notificationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  message: string;
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [] as Notification[],
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.push(action.payload);
    },
  },
});

export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;

export const selectNotifications = (state: { notifications: string }) =>
  state.notifications;
