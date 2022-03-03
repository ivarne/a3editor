import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Languages, RepoRoot } from "../../app/types";
import { Component } from "../../generated/typescript-schema/layout-inheritanceFixes";

export interface RepoState {
  initial: RepoRoot;
  current: RepoRoot;
}

const initialState: RepoState = {
  initial: null!,
  current: null!,
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const repoSlice = createSlice({
  name: "repo",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    load: (state, action: PayloadAction<RepoRoot>) => {
      state.initial = action.payload;
      state.current = action.payload;
    },
    updateComponent: (
      state,
      action: PayloadAction<{
        id: string;
        pageRef: string;
        component: Component;
      }>
    ) => {
      const pageIndex =
        state.current.settings.pages?.order?.indexOf(action.payload.pageRef) ??
        -1;
      const layout = state.current?.layouts[pageIndex].data?.layout;
      const componentIndex = layout?.findIndex(
        (c) => c.id === action.payload.id
      );
      if (layout && componentIndex) {
        layout[componentIndex] = action.payload.component;
      }
    },
    updateComponentByIndex: (
      state,
      action: PayloadAction<{
        pageIndex: number;
        componentIndex: number;
        component: Component;
      }>
    ) => {
      const { pageIndex, componentIndex } = action.payload;
      const layout = state.current?.layouts[pageIndex].data?.layout;
      if (layout && componentIndex && componentIndex > -1) {
        layout[componentIndex] = action.payload.component;
      }
    },

    updateTextResource: (
      state,
      action: PayloadAction<{
        language: Languages;
        resourceId: string;
        text: string;
      }>
    ) => {
      const { language, resourceId, text } = action.payload;
      // Ensure that language exists
      if (!state.current.resources[language]) {
        state.current.resources[language] = {
          language: language,
          resources: [],
        };
      }
      // Get resources for language
      const resources = state.current.resources[language]!.resources;

      const index = resources.findIndex((r) => r.id === resourceId);
      if (index === -1) {
        resources.push({ id: resourceId, value: text });
      } else {
        resources[index].value = text;
      }
    },
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

export const {
  load,
  updateComponent,
  updateComponentByIndex,
  updateTextResource,
} = repoSlice.actions;

export default repoSlice.reducer;
