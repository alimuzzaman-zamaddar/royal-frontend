import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  user: Record<string, unknown> | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token"),
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
