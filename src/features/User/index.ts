import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@utils/types';

// Define the initial state using that type
const initialState: User = {
  id: undefined,
  email: undefined,
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
    resetUser: () => {
      return initialState;
    },
  },
});

// on export chaque action individuellement
export const { setUser, resetUser } = userSlice.actions;

// on export le reducer comme default export
export default userSlice.reducer;
