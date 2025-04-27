import { createAppSlice } from "../app/createAppSlice";

export const isSearchSlice = createAppSlice({
  name: "isSearch",
  initialState: false,
  reducers: {
    toggleIsSearch: (state, action) => state = action.payload,
  },
});

export const {toggleIsSearch} = isSearchSlice.actions;