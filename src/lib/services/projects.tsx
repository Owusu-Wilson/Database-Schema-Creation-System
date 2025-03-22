import { supabase } from '@/lib/db';
import { Project } from '@/types';

const TABLE_NAME = 'projects'

export const schemaProjectsService = {

  async getAll() {
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('Error fetching authenticated user:', userError);
        return [];
    }

    const { data: requests, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('owner', user.user.id) // Reference authenticated user ID
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user projects:', error);
        return [];
    }

    return requests as Project[];
},

async getByID(id: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    throw new Error('Project not found'); // Throw an error if the project is not found
  }

  return data as Project;
},
    

      async add(request: Omit<Project, 'id'>) {
        const { data, error } = await supabase
          .from(TABLE_NAME) // Specify the table to insert into
          .insert([request]) // Insert the category object
          .select() // Use .select() to return the inserted data
          .single(); // Expecting a single book
        if (error) {
          console.error('Error adding book:', error);
          throw error;
        }
      
        return data; // Return the inserted data
      }, 


      async update(id: string, request: Partial<Project>) {
        const { data: updatedRequest, error } = await supabase
          .from(TABLE_NAME)
          .update(request)
          .eq('id', id)
          .select()
          .single();
    
        if (error) {
          console.error('Error updating PROJECT:', error);
          throw error;
        }
    
        return updatedRequest as Project;
      },
}