import { supabase } from '../db';
import { User, UserProfile } from '../../types';

export const usersService = {
  async getAll() {
    const { data: users, error } = await supabase
      .from('profiles')
      .select('*')
      

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return users as User[];
  },

  async getById(id: string) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return user as User;
  },

  async update(id: string, user: Partial<User>) {
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(user)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }

    return updatedUser as User;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },


  /**
   * Fetches a user's profile (from supabase profile table) by ID.
   *
   * @param {string} id The ID of the user to fetch.
   * @returns {Promise<User | null>} The user's profile, or null if an error occurred.
   */
  async getUserProfile(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user profile data:', error);
      return null;
    }

    return data as UserProfile;
  },
};
