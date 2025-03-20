import { supabase } from '../db';
 export const sendEmailToAdmin = async (emailData: { name: string; email: string; message: string }) => {
  const { data, error } = await supabase.functions.invoke('send-email-to-admin', {
    body: emailData,
  });

  if (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }

  return data;
};

