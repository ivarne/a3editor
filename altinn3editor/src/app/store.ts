import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import repoReducer from '../features/repo/repoSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    repo: repoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
