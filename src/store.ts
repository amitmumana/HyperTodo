import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Store } from "./types";

export const useStore = create<Store>()(
  persist(
    (set) => ({
      items: [],
      searchQuery: "",
      isDarkMode: false,
      isSidebarOpen: false,
      selectedNoteId: null,
      editingItem: null,
      selectedType: "all",
      selectedTag: null,
      isUser: null,
      addItem: (item) =>
        set((state) => ({
          items: [
            {
              ...item,
              id: crypto.randomUUID(),
              createdAt: Date.now(),
            },
            ...state.items,
          ],
        })),
      updateItem: (id, updatedItem) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
          ),
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.type === "todo"
              ? { ...item, completed: !item.completed }
              : item
          ),
        })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSelectedNoteId: (id) => set({ selectedNoteId: id }),
      setEditingItem: (item) => set({ editingItem: item }),
      setSelectedType: (type) => set({ selectedType: type, selectedTag: null }),
      setSelectedTag: (tag) => set({ selectedTag: tag, selectedType: "tags" }),
    }),
    {
      name: "items-storage",
    }
  )
);
