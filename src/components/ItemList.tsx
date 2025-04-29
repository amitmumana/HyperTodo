import { useEffect, useRef } from "react";
import { useStore } from "../store";
import { renderItem } from "./RenderItem";

export function ItemList() {
  const user = useStore((state) => state.user);
  const items = useStore((state) => state.items);
  const fetchMoreItems = useStore((state) => state.fetchMoreItems);
  const hasMore = useStore((state) => state.hasMore);
  const loading = useStore((state) => state.loading);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (navigator.onLine && user?.uid && items.length === 0) {
      fetchMoreItems();
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchMoreItems();
        }
      },
      { threshold: 1 }
    );

    const loaderEl = loaderRef.current;
    if (loaderEl) observer.observe(loaderEl);

    return () => {
      if (loaderEl) observer.unobserve(loaderEl);
    };
  }, [fetchMoreItems, loading, hasMore]);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="transition-all duration-300 ease-in-out">
          {renderItem(item)}
        </div>
      ))}

      <div ref={loaderRef} className="flex justify-center py-6">
        {loading ? (
          <span className="text-gray-500">Loading more items...</span>
        ) : !hasMore && items.length > 0 ? (
          <span className="text-gray-400">All items fetched ✅</span>
        ) : null}
      </div>

      {!loading && items.length === 0 && (
        <div className="text-center text-gray-400">No items available.</div>
      )}
    </div>
  );
}
