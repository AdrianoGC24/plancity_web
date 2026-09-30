import type { EventResponse } from "../../../types/events";
import { removeFavorite } from "../services/favoriteServices";
import { Link } from "react-router-dom";

interface Props {
  event: EventResponse;
  onRemove: () => void;
}

export default function FavoriteCard({ event, onRemove }: Props) {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    await removeFavorite(event.id);
    onRemove();
  };

  const imageUrl = event.images && event.images.length > 0 
    ? event.images[0] 
    : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop";

  return (
    <Link to={`/events/${event.id}`} className="glass-card flex flex-col sm:flex-row h-full overflow-hidden group">
      <div className="w-full sm:w-40 h-40 sm:h-full relative flex-shrink-0">
        <img src={imageUrl} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1 pr-4">{event.name}</h2>
            <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 rounded text-xs font-bold whitespace-nowrap">{event.category.name}</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">{event.description}</p>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium flex items-center gap-1">
            <span>📅</span> {new Date(event.date).toLocaleDateString()}
          </p>
          <button
            onClick={handleRemove}
            className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            title="Remove from favorites"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
