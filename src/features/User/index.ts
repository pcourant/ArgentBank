import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import client from '@utils/config/axios';
import type { User } from '@utils/types';

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
    // l'action set ('user/set')
    setUser: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
    signOutUser: () => {
      client.defaults.headers.common['Authorization'] = '';
      return initialState;
    },
  },
});

// on export chaque action individuellement
export const { setUser, signOutUser } = userSlice.actions;

// on export le reducer comme default export
export default userSlice.reducer;
