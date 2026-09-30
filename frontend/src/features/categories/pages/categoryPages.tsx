import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../services/categoryService";

export default function CreateCategoryPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(form);
      navigate("/admin/categories");
    } catch (error: any) {
      setError(error.response?.data?.message || "Error creando categoría");
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Crear Categoría</h1>
        <p className="text-slate-400">Añade una nueva clasificación para los eventos.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
        {error && <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">{error}</div>}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Nombre de la Categoría</label>
            <input
              name="name"
              placeholder="Ej. Concierto, Taller, Deportivo..."
              value={form.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Descripción</label>
            <input
              name="description"
              placeholder="Breve descripción de esta categoría..."
              value={form.description}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700/50 flex justify-end gap-3 mt-8">
          <button type="button" onClick={() => navigate("/admin/categories")} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Guardar Categoría
          </button>
        </div>
      </form>
    </div>
  );
}