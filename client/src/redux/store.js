import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice.js';
import globalLoadingSlice from './features/globalLoadingSlice.js';
import appStateSlice from './features/appStateSlice.js';
import authModalSlice from './features/authModalSlice.js';

const store = configureStore({
  reducer: {
    user: userSlice,
    appState: appStateSlice,
    globalLoading: globalLoadingSlice,
    authModal: authModalSlice
  }
});

export default store;