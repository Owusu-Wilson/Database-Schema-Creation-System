import { supabase } from '../db';

export const uploadBookCover = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `book-covers/${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('books')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('books')
    .getPublicUrl(filePath);

  return publicUrl;
}; 