import { db } from '../db';
import { profiles, userBooks } from '../db/schema';
import { eq } from 'drizzle-orm';

export const profilesService = {
  async getProfile(userId: string) {
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, userId));
    return profile;
  },

  async updateProfile(userId: string, data: { full_name?: string; avatar_url?: string }) {
    const [updated] = await db
      .update(profiles)
      .set({ ...data, updated_at: new Date() })
      .where(eq(profiles.id, userId))
      .returning();
    return updated;
  },

  async getPurchasedBooks(userId: string) {
    return await db
      .select({
        book: books,
        purchasedAt: userBooks.purchased_at,
        downloadCount: userBooks.download_count,
      })
      .from(userBooks)
      .innerJoin(books, eq(books.id, userBooks.book_id))
      .where(eq(userBooks.user_id, userId));
  }
}; 