import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const cards = [
    {
      to: "/admin/events",
      title: "Eventos",
      desc: "Gestionar eventos creados",
      icon: "📅",
      color: "from-indigo-500 to-blue-500"
    },
    {
      to: "/admin/categories",
      title: "Categorías",
      desc: "Administrar categorías",
      icon: "🏷️",
      color: "from-purple-500 to-pink-500"
    },
    {
      to: "/admin/events/create",
      title: "Crear Evento",
      desc: "Añadir nuevo evento al sistema",
      icon: "➕",
      color: "from-emerald-500 to-teal-500"
    },
    {
      to: "/admin/categories/create",
      title: "Crear Categoría",
      desc: "Añadir nueva categoría",
      icon: "📁",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Panel Administrador</h1>
        <p className="text-slate-400">Bienvenido al centro de control de PlanCity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <Link
            key={i}
            to={card.to}
            className="glass-card p-6 flex items-start gap-5 group"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{card.title}</h2>
              <p className="text-slate-400">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
