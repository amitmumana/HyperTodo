import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Item, Store } from "./types";
import { auth, db } from "./lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
  startAfter,
  limit,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      items: [],
      searchQuery: "",
      isDarkMode: false,
      selectedNoteId: null,
      editingItem: null,
      selectedType: "all",
      selectedTag: null,
      isUser: null,
      user: null,

      ////////////
      lastDoc: null,
      hasMore: true,
      loading: false,

      // Adding item //

      addItem: async (newItem) => {
        const user = get().user; // get current user from store
        if (!user) return;

        const todosCollectionRef = collection(
          db,
          `documents/${user.uid}/todos`
        );
        try {
          const docRef = await addDoc(todosCollectionRef, {
            ...newItem,
            createdAt: new Date(),
          });

          set((state) => ({
            items: [
              {
                ...newItem,
                id: docRef.id,
                createdAt: Date.now(),
              },
              ...state.items,
            ],
          }));

          console.log("Item added successfully!");
        } catch (error) {
          console.error("Error adding item: ", error);
        }
      },

      // Fetching items //

      fetchMoreItems: async () => {
        const { user, loading, hasMore, lastDoc, items } = get();

        console.log("fetchMoreItems called", {
          user,
          loading,
          hasMore,
          lastDoc,
        });

        if (!user?.uid || loading || !hasMore) return;

        set({ loading: true });

        try {
          const todosRef = collection(db, `documents/${user.uid}/todos`);
          const todosQuery = lastDoc
            ? query(
                todosRef,
                orderBy("createdAt", "desc"),
                startAfter(lastDoc),
                limit(50)
              )
            : query(todosRef, orderBy("createdAt", "desc"), limit(50));

          const snapshot = await getDocs(todosQuery);

          console.log("Snapshot size:", snapshot.size);

          if (snapshot.empty) {
            set({ hasMore: false });
            return;
          }

          const newItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Item[];

          console.log(newItems);

          set({
            items: [...items, ...newItems],
            lastDoc: snapshot.docs[snapshot.docs.length - 1],
            hasMore: snapshot.docs.length === 50,
          });
        } catch (err) {
          console.error("Failed to fetch more todos", err);
        } finally {
          set({ loading: false });
        }
      },

      updateItem: (id, updatedItem) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
          ),
        })),

      ////////////////

      deleteItem: async (id: string) => {
        const { user, items } = get();
        if (!user) return;

        try {
          const itemRef = doc(db, `documents/${user.uid}/todos`, id);
          await deleteDoc(itemRef);

          set({
            items: items.filter((item) => item.id !== id),
          });

          console.log("Item deleted successfully!");
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      },

      ////////////

      toggleTodo: async (id: string) => {
        const { user, items } = get();
        if (!user) return;

        const itemToUpdate = items.find((item) => item.id === id);
        if (!itemToUpdate || itemToUpdate.type !== "todo") return;

        const updatedCompleted = !itemToUpdate.completed;

        try {
          const todoRef = doc(db, `documents/${user.uid}/todos`, id);
          await updateDoc(todoRef, { completed: updatedCompleted });

          set((state) => ({
            items: state.items.map((item) =>
              item.id === id ? { ...item, completed: updatedCompleted } : item
            ),
          }));
        } catch (error) {
          console.error("Error toggling todo:", error);
        }
      },
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      setSelectedNoteId: (id) => set({ selectedNoteId: id }),
      setEditingItem: (item) => set({ editingItem: item }),
      setSelectedType: (type) => set({ selectedType: type, selectedTag: null }),
      setSelectedTag: (tag) => set({ selectedTag: tag, selectedType: "tags" }),
      setUser: (user) => {
        set({ user });
      },
      logout: async () => {
        await signOut(auth);
        set({ user: null });
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      },
    }),
    {
      name: "items-storage",
    }
  )
);
