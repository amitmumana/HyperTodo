import { AddItemForm } from "../components/AddItemForm";
import { EditItemForm } from "../components/EditItemForm";
import { ItemList } from "../components/ItemList";
import { Navbar } from "../components/Navbar";
import { NoteDetails } from "../components/NoteDetails";
import { Sidebar } from "../components/Sidebar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <ItemList />
        </main>
      </div>
      <AddItemForm />
      <NoteDetails />
      <EditItemForm />
    </div>
  );
};

export default Home;
