import { useState, useEffect } from "react";
import { X, Hash } from "lucide-react";
import { useStore } from "../store";
import { db } from "../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export function EditItemForm() {
  const { editingItem, updateItem, setEditingItem } = useStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setContent(editingItem.content);
      setUrl(editingItem.url || "");
      setTags(editingItem.tags || []);
    }
  }, [editingItem]);

  if (!editingItem) return null;

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!editingItem) return;

  //   let favicon = "";
  //   if (editingItem.type === "url" && url) {
  //     try {
  //       favicon = `https://www.google.com/s2/favicons?domain=${
  //         new URL(url).hostname
  //       }&sz=128`;
  //     } catch (error) {
  //       console.error("Invalid URL");
  //     }
  //   }

  //   const userUid = useStore.getState().user?.uid;
  //   console.log(userUid, "this is user uid");
  //   const docRef = doc(db, `documents/${userUid}/todos/${editingItem.id}`);

  //   try {
  //     await updateDoc(docRef, {
  //       title,
  //       content,
  //       tags: tags.length > 0 ? tags : [],
  //       ...(editingItem.type === "url" && { url, favicon }),
  //       updatedAt: new Date(),
  //     });

  //     console.log("Item updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating item:", error);
  //   }

  //   setEditingItem(null);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let favicon = "";
    if (editingItem.type === "url" && url) {
      try {
        favicon = `https://www.google.com/s2/favicons?domain=${
          new URL(url).hostname
        }&sz=128`;
      } catch (error) {
        console.error("Invalid URL");
      }
    }

    await updateItem({
      id: editingItem.id,
      title,
      content,
      url: editingItem.type === "url" ? url : undefined,
      tags,
      favicon: editingItem.type === "url" ? favicon : undefined,
    });

    setEditingItem(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit{" "}
            {editingItem.type.charAt(0).toUpperCase() +
              editingItem.type.slice(1)}
          </h2>
          <button
            onClick={() => setEditingItem(null)}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {editingItem.type === "url" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {editingItem.type === "note" ? "Content" : "Description"}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags (optional)
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                placeholder="Add a tag"
                className="block flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    <Hash className="w-4 h-4 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-blue-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
