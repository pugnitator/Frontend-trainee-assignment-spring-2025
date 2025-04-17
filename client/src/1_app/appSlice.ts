import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isModalOpen: boolean;
}

const appInitialState: AppState = {
  isModalOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const appSliceActions = appSlice.actions;
export const appReducer = appSlice.reducer;
