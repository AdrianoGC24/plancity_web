import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function PublicLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || (path === '/' && location.pathname === '/events');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navbar Background Blur */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-50 transition-colors duration-300"></div>
      
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform">
              E
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600 dark:from-white dark:to-slate-300">
              Eventify Pro
            </span>
          </Link>

          {/* Search Bar in Header */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-400">🔍</span>
            </div>
            <input 
              type="text" 
              placeholder="Search for events, artists, or venues..." 
              className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all dark:text-slate-200"
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-semibold transition-colors ${isActive('/') ? 'text-violet-600 dark:text-violet-400' : 'text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-white'}`}
            >
              Discover
            </Link>

            {user && (
              <Link 
                to="/favorites" 
                className={`text-sm font-semibold transition-colors ${isActive('/favorites') ? 'text-violet-600 dark:text-violet-400' : 'text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-white'}`}
              >
                Saved Events
              </Link>
            )}
            
            {user?.role === "admin" && (
              <Link 
                to="/admin" 
                className="text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold text-white">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{user.email}</span>
                </div>
                <button 
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                  className="text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 px-4 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20 text-sm font-semibold py-2 px-6 rounded-full transition-all active:scale-95">
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1 w-full pt-20 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
