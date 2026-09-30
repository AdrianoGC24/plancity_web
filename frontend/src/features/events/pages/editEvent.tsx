import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEvent } from "../services/eventService";
import { getCategories } from "../../categories/services/categoryService";
import type { CategoryResponse } from "../../../types/category";

export default function EditEvent() {
  const { id } = useParams();
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
  });

  useEffect(() => {
    getCategories().then(setCategories);
    const loadEvent = async () => {
      if (!id) return;
      try {
        const response = await getEventById(id);
        setForm({
          name: response.name,
          description: response.description,
          date: response.date.slice(0, 16),
          location: response.location,
          price: response.price,
          capacity: response.capacity,
          categoryId: response.categoryId,
        });
      } catch (e) {
        console.error(e);
      }
    };
    loadEvent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateEvent(id, {
        ...form,
        price: Number(form.price),
        capacity: Number(form.capacity),
      });
      navigate("/admin/events");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Editar Evento</h1>
        <p className="text-slate-400">Modifica la información del evento seleccionado.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Nombre del evento</label>
            <input
              name="name"
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
              value={form.price}
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
              value={form.capacity}
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
        </div>

        <div className="pt-4 border-t border-slate-700/50 flex justify-end gap-3 mt-8">
          <button type="button" onClick={() => navigate("/admin/events")} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
