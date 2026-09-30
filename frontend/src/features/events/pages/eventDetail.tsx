import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEventById } from "../services/eventService";
import type { EventResponse } from "../../../types/events";
import { useAuth } from "../../auth/hooks/useAuth";
import { addFavorite, removeFavorite, getFavorites } from "../../favorites/services/favoriteServices";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [event, setEvent] = useState<EventResponse | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) return;
        const [eventRes, favRes] = await Promise.all([
          getEventById(id),
          user ? getFavorites() : Promise.resolve([])
        ]);
        setEvent(eventRes);
        if (user) {
          setIsFavorite(favRes.some((f: any) => f.id === eventRes.id));
        }
      } catch (error: any) {
        setError(error.response?.data?.message || "Error cargando evento");
      }
    };
    loadData();
  }, [id, user]);

  const handleFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!event) return;
    
    try {
      if (isFavorite) {
        await removeFavorite(event.id);
        setIsFavorite(false);
      } else {
        await addFavorite(event.id);
        setIsFavorite(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (error) {
    return (
      <div className="glass-panel p-10 text-center max-w-lg mx-auto mt-20">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-rose-500 font-medium">{error}</p>
        <Link to="/" className="btn-primary inline-block mt-6">Back to Discover</Link>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="animate-pulse max-w-5xl mx-auto mt-10">
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl mb-8"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-800 w-2/3 rounded-lg mb-6"></div>
        <div className="h-24 bg-slate-200 dark:bg-slate-800 w-full rounded-lg mb-8"></div>
      </div>
    );
  }

  const imageUrl = event.images && event.images.length > 0 
    ? event.images[0] 
    : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 mb-6 transition-colors font-medium">
        <span>←</span> Back to Discovery
      </Link>
      
      {/* Large Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-10 shadow-2xl group">
        <img src={imageUrl} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <span className="inline-block px-4 py-1.5 bg-violet-600 text-white rounded-full text-sm font-bold mb-4 shadow-lg uppercase tracking-wider">
            {event.category.name}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 leading-tight">{event.name}</h1>
          <p className="text-violet-200 text-lg md:text-xl font-medium">
            {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Description */}
          <section className="glass-panel p-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">About this Event</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </section>

          {/* Gallery */}
          {event.images && event.images.length > 1 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {event.images.slice(1).map((img, i) => (
                  <div key={i} className="aspect-video rounded-2xl overflow-hidden shadow-md">
                    <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Sticky Info */}
        <div className="space-y-6 relative">
          <div className="sticky top-28 space-y-6">
            <div className="glass-panel p-8">
              <div className="text-center mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wide mb-1">Ticket Price</p>
                <p className="text-5xl font-extrabold text-slate-900 dark:text-white">
                  {event.price === 0 ? "Free" : `$${event.price}`}
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center text-2xl flex-shrink-0">📅</div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Date & Time</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{new Date(event.date).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl flex-shrink-0">📍</div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Location</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{event.location}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl flex-shrink-0">👥</div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Capacity</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{event.capacity} Attendees</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleFavorite}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
                  isFavorite 
                    ? "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-500/30" 
                    : "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-500/30"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
