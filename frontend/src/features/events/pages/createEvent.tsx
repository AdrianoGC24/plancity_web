import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";
import { getCategories } from "../../categories/services/categoryService";
import type { CategoryResponse } from "../../../types/category";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    price: 0,
    capacity: 0,
    categoryId: "",
    images: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent({
        name: form.name,
        description: form.description,
        date: form.date,
        location: form.location,
        price: Number(form.price),
        capacity: Number(form.capacity),
        categoryId: form.categoryId,
        images: form.images ? [form.images] : [],
      });
      navigate("/admin/events");
    } catch (error: any) {
      setError(error.response?.data?.message || "Error creando evento");
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Crear Nuevo Evento</h1>
        <p className="text-slate-400">Completa la información para registrar un evento.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
        {error && <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Nombre del evento</label>
            <input
              name="name"
              placeholder="Ej. Concierto de Rock"
              value={form.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Descripción</label>
            <input
              name="description"
              placeholder="Detalles sobre el evento..."
              value={form.description}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Fecha y Hora</label>
            <input
              name="date"
              type="datetime-local"
              value={form.date}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Ubicación</label>
            <input
              name="location"
              placeholder="Dirección del lugar"
              value={form.location}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Precio ($)</label>
            <input
              name="price"
              type="number"
              placeholder="0.00"
              value={form.price || ""}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Capacidad Total</label>
            <input
              name="capacity"
              type="number"
              placeholder="Ej. 500"
              value={form.capacity || ""}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Categoría</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Seleccione categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">URL de Imagen (Opcional)</label>
            <input
              name="images"
              placeholder="https://..."
              value={form.images}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700/50 flex justify-end gap-3 mt-8">
          <button type="button" onClick={() => navigate("/admin/events")} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Crear Evento
          </button>
        </div>
      </form>
    </div>
  );
}
