import type { EventResponse } from "../../../types/events";
import { addFavorite, removeFavorite } from "../../favorites/services/favoriteServices";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

interface Props {
  event: EventResponse;
  isFavorite?: boolean;
  onFavoriteChange?: () => void;
}

export default function EventCard({ event, isFavorite = false, onFavoriteChange }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (isFavorite) {
      await removeFavorite(event.id);
    } else {
      await addFavorite(event.id);
    }
    onFavoriteChange?.();
  };

  // Fallback image if none provided
  const imageUrl = event.images && event.images.length > 0 
    ? event.images[0] 
    : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop";

  return (
    <Link to={`/events/${event.id}`} className="glass-card flex flex-col group block h-full relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="h-48 relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={event.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleFavorite}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              isFavorite 
                ? "bg-rose-500 text-white shadow-rose-500/40" 
                : "bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white"
            }`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-violet-600 text-white text-xs font-bold rounded-full shadow-lg uppercase tracking-wide">
            {event.category.name}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-xs font-bold text-violet-600 dark:text-violet-400 mb-2 uppercase tracking-wide">
          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
        </div>
        <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">{event.name}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm line-clamp-2 flex-1">{event.description}</p>

        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
          <span className="text-lg">📍</span>
          <span className="truncate" title={event.location}>{event.location}</span>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <div className="font-bold text-lg text-slate-900 dark:text-white">
             {event.price === 0 ? "Free" : `$${event.price}`}
           </div>
           <div className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
             {event.capacity} spots
           </div>
        </div>
      </div>
    </Link>
  );
}
