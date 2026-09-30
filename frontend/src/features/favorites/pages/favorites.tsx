import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites } from "../services/favoriteServices";
import type { EventResponse } from "../../../types/events";
import FavoriteCard from "../components/favoritecards";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await getFavorites();
      setFavorites(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pt-8">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 mb-4 tracking-tight">
          Your Saved Events
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
          Keep track of all the experiences you don't want to miss.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => (
             <div key={i} className="h-40 bg-slate-200 dark:bg-slate-800/50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="glass-panel p-16 text-center mt-10">
           <div className="text-7xl mb-6">🏜️</div>
           <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">You haven't saved any events yet</h3>
           <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto text-lg">
             Explore our catalog and find the best activities happening around you.
           </p>
           <Link to="/" className="btn-primary text-lg px-8">Browse Events</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((event) => (
            <FavoriteCard key={event.id} event={event} onRemove={loadFavorites} />
          ))}
        </div>
      )}
    </div>
  );
}
