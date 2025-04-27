import { createAppSlice } from "../app/createAppSlice";

export const userNameSlice = createAppSlice({
  name: "userName",
  initialState: "",
  reducers: {
    toggleUserName: (state, action) => state = action.payload,
  },
});

export const {toggleUserName} = userNameSlice.actions;