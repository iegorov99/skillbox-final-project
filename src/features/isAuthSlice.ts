import { createAppSlice } from "../app/createAppSlice";

export const isAuthSlice = createAppSlice({
  name: "isAuth",
  initialState: false,
  reducers: {
    toggleIsAuth: (state, action) => state = action.payload,
  },
});

export const {toggleIsAuth} = isAuthSlice.actions;