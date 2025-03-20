import { supabase } from '../db';
import { BookRequest } from '../../types';



export const bookRequestService = {

    async getAll() {
        const { data: requests, error } = await supabase
          .from('book_requests')
          .select('*')
          .order('created_at', { ascending: false });
    
        if (error) {
          console.error('Error fetching book requests:', error);
          return [];
        }
    
        return requests as BookRequest[];
      },


      async add(request: Omit<BookRequest, 'id'>) {
        const { data, error } = await supabase
          .from('book_requests') // Specify the table to insert into
          .insert([request]) // Insert the category object
          .select(); // Use .select() to return the inserted data
      
        if (error) {
          console.error('Error adding book:', error);
          throw error;
        }
      
        return data; // Return the inserted data
      }, 


      async update(id: string, request: Partial<BookRequest>) {
        const { data: updatedRequest, error } = await supabase
          .from('book_requests')
          .update(request)
          .eq('id', id)
          .select()
          .single();
    
        if (error) {
          console.error('Error updating book request:', error);
          throw error;
        }
    
        return updatedRequest as BookRequest;
      },
}