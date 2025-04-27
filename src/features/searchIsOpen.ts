import { createAppSlice } from "../app/createAppSlice";

export const searchIsOpenSlice = createAppSlice({
  name: "searchIsOpen",
  initialState: false,
  reducers: {
    toggleSearchIsOpen: (state, action) => state = action.payload,
  },
});

export const {toggleSearchIsOpen} = searchIsOpenSlice.actions;