import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (_, action: PayloadAction<AuthState>) => ({
      accessToken: action.payload.accessToken,
    }),
  },
});

export const { setAccessToken } = authSlice.actions;

export const getAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
