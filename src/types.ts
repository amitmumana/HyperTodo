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
  ////////////
  lastDoc: any;
  // QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  loading: boolean;
  //////////
  addItem: (item: Omit<Item, "id" | "createdAt">) => void;
  fetchMoreItems: () => Promise<void>;
  //////////
  updateItem: (
    id: string,
    item: Partial<Omit<Item, "id" | "createdAt">>
  ) => void;
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
