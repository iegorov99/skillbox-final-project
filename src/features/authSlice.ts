import { createAppSlice } from "../app/createAppSlice";

export const authTypeSlice = createAppSlice({
  name: "authType",
  initialState: "login",
  reducers: {
    toggleAuthType: (state, action) => state = action.payload,
  },
});

export const {toggleAuthType} = authTypeSlice.actions;