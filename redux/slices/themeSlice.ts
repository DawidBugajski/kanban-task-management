import { createSlice } from '@reduxjs/toolkit';

type initialState = {
  value: ThemeState;
};

type ThemeState = {
  isLightMode: boolean;
};

const initialState: initialState = {
  value: {
    isLightMode: true,
  },
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value.isLightMode = !state.value.isLightMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
