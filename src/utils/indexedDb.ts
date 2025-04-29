// lib/indexedDb.ts
import { openDB } from "idb";
import { Item } from "../types";

const DB_NAME = "todo_app";
const STORE_NAME = "todos";

export const getDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const saveTodosToIndexedDB = async (todos: Item[]) => {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  for (const todo of todos) {
    tx.store.put(todo);
  }
  await tx.done;
};

export const getTodosFromIndexedDB = async (): Promise<Item[]> => {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
};

export const clearTodosFromIndexedDB = async () => {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.clear();
  await tx.done;
};
