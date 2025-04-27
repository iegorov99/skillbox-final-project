import { createAppSlice } from "../app/createAppSlice";

export const isTreilerOpenSlice = createAppSlice({
  name: "isTreilerOpen",
  initialState: false,
  reducers: {
    toggleisTreilerOpen: (state, action) => state = action.payload,
  },
});

export const {toggleisTreilerOpen} = isTreilerOpenSlice.actions;