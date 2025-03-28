import { FileText, Link, ListTodo, X, Hash, Home } from 'lucide-react';
import { useStore } from '../store';
import { ItemType } from '../types';

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, items, selectedType, setSelectedType, selectedTag, setSelectedTag } = useStore();

  const itemTypes = [
    { type: 'all', label: 'All Items', icon: Home },
    { type: 'url', label: 'URLs', icon: Link },
    { type: 'note', label: 'Notes', icon: FileText },
    { type: 'todo', label: 'Todos', icon: ListTodo },
    { type: 'tags', label: 'Tags', icon: Hash },
  ] as const;

  // Get unique tags from all items
  const tags = Array.from(new Set(items.flatMap(item => item.tags || []))).sort();

  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar} />
      )}
      
      <aside
        className={`fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 md:hidden">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {itemTypes.map(({ type, label, icon: Icon }) => (
              <li key={type}>
                <button
                  onClick={() => {
                    setSelectedType(type);
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors duration-200 ${
                    selectedType === type && !selectedTag
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </button>
              </li>
            ))}

            {selectedType === 'tags' && tags.length > 0 && (
              <li className="pt-4">
                <div className="px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Tags
                </div>
                <ul className="mt-2 space-y-1">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <button
                        onClick={() => {
                          setSelectedTag(tag);
                          if (window.innerWidth < 768) {
                            toggleSidebar();
                          }
                        }}
                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                          selectedTag === tag
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Hash className="h-4 w-4" />
                        <span>{tag}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
}