import { Check, Edit, ExternalLink, Hash, Trash, X } from "lucide-react";
import { Item } from "../types";
import { useState } from "react";
import { useStore } from "../store";

export const renderItem = (item: Item) => {
  const toggleTodo = useStore((state) => state.toggleTodo);
  const deleteItem = useStore((state) => state.deleteItem);
  const [longPressItem, setLongPressItem] = useState<string | null>(null);
  let longPressTimer: ReturnType<typeof setTimeout>;
  const isLongPressed = longPressItem === item.id;

  const handleLongPress = (id: string) => {
    longPressTimer = setTimeout(() => {
      setLongPressItem(id);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };

  const itemProps = {
    onTouchStart: () => handleLongPress(item.id),
    onTouchEnd: handleTouchEnd,
    onMouseDown: () => handleLongPress(item.id),
    onMouseUp: handleTouchEnd,
    onMouseLeave: handleTouchEnd,
  };

  const actionButtons = isLongPressed && (
    <div className="absolute right-2 top-2 flex space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLongPressItem(null);
          // setEditingItem(item);
        }}
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLongPressItem(null);
          deleteItem(item.id);
        }}
        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        <Trash className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLongPressItem(null);
        }}
        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );

  const renderTags = item.tags && item.tags.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-2">
      {item.tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        >
          <Hash className="w-3 h-3 mr-1" />
          {tag}
        </span>
      ))}
    </div>
  );

  switch (item.type) {
    case "url":
      return (
        <div
          {...itemProps}
          className="relative flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer"
        >
          {actionButtons}
          {item.favicon && (
            <img src={item.favicon} alt="" className="w-6 h-6 mt-1" />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 flex items-center space-x-1"
              // onClick={(e) => isLongPressed && e.preventDefault()}
            >
              <span>{item.url}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            {renderTags}
          </div>
        </div>
      );

    case "note":
      return (
        <div
          {...itemProps}
          onClick={(e) => !isLongPressed && e.preventDefault()}
          className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer"
        >
          {actionButtons}
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap line-clamp-3">
            {item.content}
          </p>
          {renderTags}
        </div>
      );

    case "todo":
      return (
        <div
          {...itemProps}
          className="relative flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer"
        >
          {actionButtons}
          <button
            onClick={() => !isLongPressed && toggleTodo(item.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
              item.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            {item.completed && <Check className="w-5 h-5 text-white" />}
          </button>
          <div className="flex-1">
            <h3
              className={`text-lg font-medium ${
                item.completed
                  ? "text-gray-500 dark:text-gray-400 line-through"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-sm ${
                item.completed
                  ? "text-gray-400 dark:text-gray-500 line-through"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {item.content}
            </p>
            {renderTags}
          </div>
        </div>
      );
  }
};
