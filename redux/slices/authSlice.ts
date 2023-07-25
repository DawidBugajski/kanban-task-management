import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type initialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  uid: string;
  isModerator: boolean;
};

const initialState = {
  value: {
    isAuth: false,
    username: '',
    uid: '',
    isModerator: false,
  } as AuthState,
} as initialState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (_, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
          uid: '38283',
          isModerator: false,
        },
      };
    },
    toggleModerator: (state) => {
      state.value.isModerator = !state.value.isModerator;
    },
  },
});

export const { logIn, logOut, toggleModerator } = authSlice.actions;
//get single value from InitialState
export const getName = (state: RootState): string => state.auth.value.username;
export default authSlice.reducer;
