import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const magicLinks = pgTable("magic_links", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  email: text("email").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tiles = pgTable("tiles", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'notes', 'tasks', 'paceCalculator'
  position: integer("position").notNull(),
  settings: jsonb("settings").notNull().$type<Record<string, unknown>>(),
  userId: integer("user_id").references(() => users.id),
});

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  userId: integer("user_id").references(() => users.id),
});

// Schemas
export const insertTileSchema = createInsertSchema(tiles);
export const insertNoteSchema = createInsertSchema(notes);
export const insertTaskSchema = createInsertSchema(tasks);
export const insertUserSchema = createInsertSchema(users);
export const insertMagicLinkSchema = createInsertSchema(magicLinks);

// Types
export type InsertTile = z.infer<typeof insertTileSchema>;
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMagicLink = z.infer<typeof insertMagicLinkSchema>;

export type Tile = typeof tiles.$inferSelect;
export type Note = typeof notes.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type User = typeof users.$inferSelect;
export type MagicLink = typeof magicLinks.$inferSelect;