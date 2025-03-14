import { type Tile, type Note, type Task, type InsertTile, type InsertNote, type InsertTask } from "@shared/schema";

export interface IStorage {
  // Tiles
  getTiles(): Promise<Tile[]>;
  updateTilePosition(id: number, position: number): Promise<Tile>;
  updateTileSettings(id: number, settings: Record<string, unknown>): Promise<Tile>;
  
  // Notes
  getNotes(): Promise<Note[]>;
  createNote(note: InsertNote): Promise<Note>;
  updateNote(id: number, content: string): Promise<Note>;
  deleteNote(id: number): Promise<void>;
  
  // Tasks
  getTasks(): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, completed: boolean): Promise<Task>;
  deleteTask(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private tiles: Map<number, Tile>;
  private notes: Map<number, Note>;
  private tasks: Map<number, Task>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.tiles = new Map([
      [1, { id: 1, type: 'notes', position: 0, settings: {} }],
      [2, { id: 2, type: 'tasks', position: 1, settings: {} }]
    ]);
    this.notes = new Map();
    this.tasks = new Map();
    this.currentIds = { tiles: 3, notes: 1, tasks: 1 };
  }

  // Tiles
  async getTiles(): Promise<Tile[]> {
    return Array.from(this.tiles.values());
  }

  async updateTilePosition(id: number, position: number): Promise<Tile> {
    const tile = this.tiles.get(id);
    if (!tile) throw new Error('Tile not found');
    const updated = { ...tile, position };
    this.tiles.set(id, updated);
    return updated;
  }

  async updateTileSettings(id: number, settings: Record<string, unknown>): Promise<Tile> {
    const tile = this.tiles.get(id);
    if (!tile) throw new Error('Tile not found');
    const updated = { ...tile, settings };
    this.tiles.set(id, updated);
    return updated;
  }

  // Notes
  async getNotes(): Promise<Note[]> {
    return Array.from(this.notes.values());
  }

  async createNote(note: InsertNote): Promise<Note> {
    const id = this.currentIds.notes++;
    const newNote = { ...note, id };
    this.notes.set(id, newNote);
    return newNote;
  }

  async updateNote(id: number, content: string): Promise<Note> {
    const note = this.notes.get(id);
    if (!note) throw new Error('Note not found');
    const updated = { ...note, content };
    this.notes.set(id, updated);
    return updated;
  }

  async deleteNote(id: number): Promise<void> {
    if (!this.notes.delete(id)) throw new Error('Note not found');
  }

  // Tasks
  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async createTask(task: InsertTask): Promise<Task> {
    const id = this.currentIds.tasks++;
    const newTask = { ...task, id };
    this.tasks.set(id, newTask);
    return newTask;
  }

  async updateTask(id: number, completed: boolean): Promise<Task> {
    const task = this.tasks.get(id);
    if (!task) throw new Error('Task not found');
    const updated = { ...task, completed };
    this.tasks.set(id, updated);
    return updated;
  }

  async deleteTask(id: number): Promise<void> {
    if (!this.tasks.delete(id)) throw new Error('Task not found');
  }
}

export const storage = new MemStorage();