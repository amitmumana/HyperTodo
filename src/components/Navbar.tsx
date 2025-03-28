import { Menu, Moon, Search, Sun } from 'lucide-react';
import { useStore } from '../store';

export function Navbar() {
  const { searchQuery, setSearchQuery, isDarkMode, toggleDarkMode, toggleSidebar } = useStore();

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-white"
                placeholder="Search items..."
              />
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}