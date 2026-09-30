import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../../events/services/eventService";
import { Link } from "react-router-dom";
import type { EventResponse } from "../../../types/events";

export default function AdminEvents() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      setEvents(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este evento?")) {
      await deleteEvent(id);
      loadEvents();
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Gestión de Eventos</h1>
          <p className="text-slate-400 mt-1">Administra todo el catálogo de eventos</p>
        </div>

        <Link
          to="/admin/events/create"
          className="btn-primary flex items-center gap-2"
        >
          <span>➕</span> Nuevo Evento
        </Link>
      </div>

      <div className="glass-panel overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-400">Cargando eventos...</div>
        ) : events.length === 0 ? (
          <div className="p-10 text-center text-slate-400">No hay eventos registrados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-700/50">
                  <th className="p-5 font-semibold text-slate-300">Nombre</th>
                  <th className="p-5 font-semibold text-slate-300">Categoría</th>
                  <th className="p-5 font-semibold text-slate-300">Lugar</th>
                  <th className="p-5 font-semibold text-slate-300">Precio</th>
                  <th className="p-5 font-semibold text-center text-slate-300">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-5 text-white font-medium">{event.name}</td>
                    <td className="p-5 text-slate-400">
                      <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-xs border border-slate-700">
                        {event.category.name}
                      </span>
                    </td>
                    <td className="p-5 text-slate-400">{event.location}</td>
                    <td className="p-5 text-emerald-400 font-medium">${event.price}</td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/admin/events/edit/${event.id}`}
                          className="px-3 py-1.5 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-lg text-sm font-medium transition-colors border border-amber-500/20"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="px-3 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg text-sm font-medium transition-colors border border-rose-500/20"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
