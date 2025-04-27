import { createAppSlice } from "../app/createAppSlice";

export const modalIsOpenSlice = createAppSlice({
  name: "modalIsOpen",
  initialState: false,
  reducers: {
    toggleModalIsOpen: (state, action) => state = action.payload,
  },
});

export const {toggleModalIsOpen} = modalIsOpenSlice.actions;