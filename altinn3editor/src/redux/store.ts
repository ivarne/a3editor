import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currentRepoReducer from './reducers/currentRepoSlice';
import editorSettingsSlice from './reducers/editorSettingsSlice';
import initialRepoReducer from './reducers/initialRepoSlice';

export const store = configureStore({
  reducer: {
    editorSettings: editorSettingsSlice,
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
