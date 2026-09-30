import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function DashboardLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/events", label: "Manage Events", icon: "📅" },
    { path: "/admin/categories", label: "Manage Categories", icon: "🏷️" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex relative overflow-hidden transition-colors duration-300">
      {/* Sidebar background */}
      <div className="absolute top-0 left-0 w-72 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-r border-slate-200 dark:border-slate-800 z-10 transition-colors"></div>
      
      <aside className="w-72 p-6 flex flex-col z-20 sticky top-0 h-screen overflow-y-auto hide-scrollbar">
        <Link to="/" className="flex items-center gap-3 mb-12 px-2 hover:opacity-80 transition-opacity group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
            EP
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Admin</h1>
            <p className="text-xs text-violet-600 dark:text-violet-400 font-bold tracking-wide uppercase">Eventify Pro</p>
          </div>
        </Link>

        <nav className="flex-1 space-y-2">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-2">Main Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <span className="text-violet-600 dark:text-violet-400 font-bold">{user?.email?.[0].toUpperCase()}</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800/50 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 py-3 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-rose-200 dark:hover:border-rose-500/20 transition-all font-semibold shadow-sm"
          >
            <span>🚪</span> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 lg:p-12 z-10 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
