import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/db';
import { AuthError, User as SupabaseUser } from '@supabase/supabase-js';
// import { usersService } from '../../lib/services/users';


type Role = 'user' | 'authenticated';

interface User {
  id: string;
  email: string;
  role: Role
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}


const initialUserData:User = {
  id:'aauu454524dfjakl656',
  role:'authenticated',
  email:'owusuwilson980@gmail.com', 

}
const initialState: AuthState = {
  user: initialUserData,
  isLoading: false,
  error: null,
};

// Fetch user profile from the profiles table
const getUserProfile = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user profile data:', error);
    return null;
  }

  return data;
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      // Fetch the user's profile to get the role
      const profile = await getUserProfile(data.user.id);

      if (!profile) {
        throw new Error('User profile not found');
      }

      return {
        id: data.user.id,
        email: data.user.email || '',
        role: profile.role || 'user',
      };
    } catch (error) {
      if (error instanceof AuthError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An error occurred during login');
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An error occurred during logout');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export type { AuthState };


export default authSlice.reducer;