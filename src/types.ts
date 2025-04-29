export type ItemType = "url" | "note" | "todo";
import { User } from "firebase/auth";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  content: string;
  createdAt: number;
  completed?: boolean;
  url?: string;
  favicon?: string;
  tags?: string[];
}

export interface Store {
  items: Item[];
  searchQuery: string;
  isDarkMode: boolean;
  selectedNoteId: string | null;
  editingItem: Item | null;
  selectedType: ItemType | "all" | "tags";
  selectedTag: string | null;
  isUser: any;
  user: User | null;
  lastDoc: any;
  hasMore: boolean;
  loading: boolean;

  ////////////////////
  addItem: (item: Omit<Item, "id" | "createdAt">) => void;
  fetchMoreItems: () => Promise<void>;
  updateItem: (data: {
    id: string;
    title: string;
    content: string;
    url?: string;
    tags?: string[];
    favicon?: string;
  }) => Promise<void>;
  deleteItem: (id: string) => void;
  toggleTodo: (id: string) => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
  setSelectedNoteId: (id: string | null) => void;
  setEditingItem: (item: Item | null) => void;
  setSelectedType: (type: ItemType | "all" | "tags") => void;
  setSelectedTag: (tag: string | null) => void;
  setUser: (user: User | null) => void;
}
