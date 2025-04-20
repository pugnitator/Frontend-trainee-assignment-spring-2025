import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isModalOpen: boolean;
  isHeaderModalOpen: boolean;
}

const appInitialState: AppState = {
  isModalOpen: false,
  isHeaderModalOpen: false,
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
    openHeaderModal(state) {
      state.isHeaderModalOpen = true;
    },
    closeHeaderModal(state) {
      state.isHeaderModalOpen = false;
    },
  },
});

export const appSliceActions = appSlice.actions;
export const appReducer = appSlice.reducer;
