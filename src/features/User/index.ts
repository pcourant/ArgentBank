import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import client from '@utils/config/axios';
import type { NameInterface, User } from '@utils/types';

// Define the initial state using that type
const initialState: User = {
  isAuthenticated: false,
  firstName: undefined,
  lastName: undefined,
};

const userSlice = createSlice({
  // le nom du slice
  name: 'user',
  // le state initial
  initialState,
  // reducers permet de définir les actions et le reducer
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload}`;
      state.isAuthenticated = true;
    },
    signOut: () => {
      client.defaults.headers.common['Authorization'] = '';
      return initialState;
    },
    setName: (state, action: PayloadAction<NameInterface>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

// on export chaque action individuellement
export const { setName, signIn, signOut } = userSlice.actions;

// on export le reducer comme default export
export default userSlice.reducer;
