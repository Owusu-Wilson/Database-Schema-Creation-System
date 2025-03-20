import { pgTable, text, timestamp, boolean, uuid, json } from 'drizzle-orm/pg-core';

// Define the auth.users table (as per Supabase's default schema)
export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // Supabase auth.users.id is a UUID
  email: text('email').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Profiles Table
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().references(() => users.id), // References auth.users.id
  full_name: text('full_name'),
  avatar_url: text('avatar_url'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Projects Table
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  owner: uuid('owner').notNull().references(() => profiles.id), // References profiles.id
  is_public: boolean('is_public').notNull().default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Schema Outputs Table
export const schema_outputs = pgTable('schema_outputs', {
  id: uuid('id').primaryKey().defaultRandom(),
  project_id: uuid('project_id').notNull().references(() => projects.id), // References projects.id
  schema_type: text('schema_type').notNull(), // e.g., 'SQL', 'NoSQL'
  schema_data: json('schema_data').notNull(), // Stores the generated schema (SQL DDL or NoSQL JSON)
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Types
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertProfile = typeof profiles.$inferInsert;
export type SelectProfile = typeof profiles.$inferSelect;

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;

export type InsertSchemaOutput = typeof schema_outputs.$inferInsert;
export type SelectSchemaOutput = typeof schema_outputs.$inferSelect;