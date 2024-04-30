import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BreadItem } from "../types";

interface InitialState {
  breadcrumbs: BreadItem[];
}

const initialState: InitialState = {
  breadcrumbs: [
    {
      to: "/dashboard",
      label: "Dashboard",
    },
  ],
};

const breadSlice = createSlice({
  name: "bread",
  initialState,
  reducers: {
    setBreadcrumbs: (state, action: PayloadAction<BreadItem[]>) => {
      state.breadcrumbs = action.payload;
    },
  },
});

export const { setBreadcrumbs } = breadSlice.actions;

export default breadSlice.reducer;
