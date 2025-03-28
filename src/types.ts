export type ItemType = "url" | "note" | "todo";

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
  isSidebarOpen: boolean;
  selectedNoteId: string | null;
  editingItem: Item | null;
  selectedType: ItemType | "all" | "tags";
  selectedTag: string | null;
  isUser: any;
  addItem: (item: Omit<Item, "id" | "createdAt">) => void;
  updateItem: (
    id: string,
    item: Partial<Omit<Item, "id" | "createdAt">>
  ) => void;
  deleteItem: (id: string) => void;
  toggleTodo: (id: string) => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setSelectedNoteId: (id: string | null) => void;
  setEditingItem: (item: Item | null) => void;
  setSelectedType: (type: ItemType | "all" | "tags") => void;
  setSelectedTag: (tag: string | null) => void;
}
