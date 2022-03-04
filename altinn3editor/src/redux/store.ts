import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currentRepoReducer from './reducers/currentRepoSlice';
import initialRepoReducer from './reducers/initialRepoSlice';

export const store = configureStore({
  reducer: {
    currentRepo: currentRepoReducer,
    initialRepo: initialRepoReducer
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
