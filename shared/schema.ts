import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tiles = pgTable("tiles", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'notes', 'weather', 'tasks'
  position: integer("position").notNull(),
  settings: jsonb("settings").notNull().$type<Record<string, unknown>>(),
});

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const insertTileSchema = createInsertSchema(tiles);
export const insertNoteSchema = createInsertSchema(notes);
export const insertTaskSchema = createInsertSchema(tasks);

export type InsertTile = z.infer<typeof insertTileSchema>;
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Tile = typeof tiles.$inferSelect;
export type Note = typeof notes.$inferSelect;
export type Task = typeof tasks.$inferSelect;
