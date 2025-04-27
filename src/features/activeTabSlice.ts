import { createAppSlice } from "../app/createAppSlice";

export const activeTabSlice = createAppSlice({
  name: "activeTab",
  initialState: "favorites",
  reducers: {
    toggleActiveTab: (state, action) => state = action.payload,
  },
});

export const {toggleActiveTab} = activeTabSlice.actions;