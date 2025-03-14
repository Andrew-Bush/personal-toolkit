import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNoteSchema, insertTaskSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Tiles
  app.get("/api/tiles", async (_req, res) => {
    const tiles = await storage.getTiles();
    res.json(tiles);
  });

  app.patch("/api/tiles/:id/position", async (req, res) => {
    const { position } = req.body;
    const tile = await storage.updateTilePosition(parseInt(req.params.id), position);
    res.json(tile);
  });

  app.patch("/api/tiles/:id/settings", async (req, res) => {
    const { settings } = req.body;
    const tile = await storage.updateTileSettings(parseInt(req.params.id), settings);
    res.json(tile);
  });

  // Notes
  app.get("/api/notes", async (_req, res) => {
    const notes = await storage.getNotes();
    res.json(notes);
  });

  app.post("/api/notes", async (req, res) => {
    const note = insertNoteSchema.parse(req.body);
    const created = await storage.createNote(note);
    res.status(201).json(created);
  });

  app.patch("/api/notes/:id", async (req, res) => {
    const { content } = req.body;
    const updated = await storage.updateNote(parseInt(req.params.id), content);
    res.json(updated);
  });

  app.delete("/api/notes/:id", async (req, res) => {
    await storage.deleteNote(parseInt(req.params.id));
    res.status(204).end();
  });

  // Tasks
  app.get("/api/tasks", async (_req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.post("/api/tasks", async (req, res) => {
    const task = insertTaskSchema.parse(req.body);
    const created = await storage.createTask(task);
    res.status(201).json(created);
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    const { completed } = req.body;
    const updated = await storage.updateTask(parseInt(req.params.id), completed);
    res.json(updated);
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    await storage.deleteTask(parseInt(req.params.id));
    res.status(204).end();
  });

  const httpServer = createServer(app);
  return httpServer;
}
