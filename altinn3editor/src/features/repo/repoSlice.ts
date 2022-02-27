import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RepoRoot } from "../../app/types";

export interface RepoState {
  initial?: RepoRoot;
  current?: RepoRoot;
}

const initialState: RepoState = {
  initial: null!,
  current: null!,
};

export const repoSlice = createSlice({
  name: "repo",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    load: (state, action: PayloadAction<RepoRoot>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.initial = action.payload;
      state.current = action.payload;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    // builder
    //   .addCase(incrementAsync.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(incrementAsync.fulfilled, (state, action) => {
    //     state.status = 'idle';
    //     state.value += action.payload;
    //   });
  },
});

export const { load } = repoSlice.actions;

export default repoSlice.reducer;
