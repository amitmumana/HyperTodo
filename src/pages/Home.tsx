import { Moon, Search, Sun } from "lucide-react";
import { AddItemForm } from "../components/AddItemForm";
import { EditItemForm } from "../components/EditItemForm";
import { ItemList } from "../components/ItemList";
import { useStore } from "../store";

const Home = () => {
  const { user, searchQuery, setSearchQuery, isDarkMode, toggleDarkMode } =
    useStore();

  return (
    <div className="min-h-screen  px-6 py-8 max-w-md mx-auto ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900  dark:text-white">
          Expiry Countdown
        </h1>
        <div className="flex gap-5">
          <button
            onClick={toggleDarkMode}
            className=" text-gray-600 dark:text-gray-300"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>

      <div className="relative flex-1  mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400 dark:text-white" />
        </div>
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full dark:text-white bg-gray-50/60 border-none focus:outline-none focus:ring-2 focus:ring-gray-900   border-gray-300 dark:border-gray-600 leading-5 bg-white dark:bg-gray-700 placeholder-gray-500   "
        />
      </div>

      <ItemList />
      <AddItemForm />
      <EditItemForm />
    </div>
  );
};

export default Home;
