import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Item, Store } from "./types";
import { db } from "./lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

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
      user: null,
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
      setUser: (user) => {
        set({ user });
        if (user) {
          // Subscribe to user's items when user is set
          const q = query(
            collection(db, "items"),
            where("uid", "==", user.uid)
          );

          const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Item[];
            set({ items });
          });

          // You might want to store unsubscribe function if you need to clean up later
          return () => unsubscribe();
        } else {
          set({ items: [] }); // Clear items when user logs out
        }
      },
    }),
    {
      name: "items-storage",
    }
  )
);
