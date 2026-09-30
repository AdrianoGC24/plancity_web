import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import type { EventResponse } from "../../../types/events";
import EventCard from "../components/eventcard";
import { getFavorites } from "../../favorites/services/favoriteServices";
import { useAuth } from "../../auth/hooks/useAuth";
import { Link } from "react-router-dom";

export default function EventPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [favorites, setFavorites] = useState<EventResponse[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const loadFavorites = async () => {
    if (!user) return;
    try {
      const response = await getFavorites();
      setFavorites(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const response = await getEvents();
        setEvents(response);
      } catch (error: any) {
        setError(error.response?.data?.message || "Error cargando eventos");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
    loadFavorites();
  }, [user]);

  // Extract unique categories for the filter
  const categories = ["All", ...Array.from(new Set(events.map(e => e.category.name)))];

  const filteredEvents = activeCategory === "All" 
    ? events 
    : events.filter(e => e.category.name === activeCategory);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white mb-16 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 to-blue-600/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
          alt="Concert Crowd" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="relative z-20 px-8 md:px-16 py-20 md:py-32 flex flex-col items-center text-center">
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm font-bold tracking-wider uppercase mb-6 border border-white/20">
            Welcome to Eventify Pro
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Discover the best <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">events in your city</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-10 font-medium">
            Explore concerts, tech meetups, sports matches, and exclusive workshops happening right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            {!user && (
              <Link to="/register" className="btn-primary w-full sm:w-auto text-lg px-8 shadow-violet-500/50">
                Join Now
              </Link>
            )}
            <a href="#explore" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-3 px-8 rounded-xl backdrop-blur-md transition-all active:scale-95 w-full sm:w-auto">
              Explore Events
            </a>
          </div>
        </div>
      </section>

      <div id="explore" className="mb-12 scroll-mt-28">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Upcoming Events</h2>
          
          {/* Category Filter Chips */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category 
                    ? "bg-violet-600 text-white shadow-md shadow-violet-500/30" 
                    : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 mb-8 font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[420px] bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 glass-panel">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No events found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try selecting a different category or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isFavorite={favorites.some((fav) => fav.id === event.id)}
                onFavoriteChange={loadFavorites}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
