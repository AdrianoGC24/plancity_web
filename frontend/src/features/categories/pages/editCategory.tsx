import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../services/categoryService";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const loadCategory = async () => {
      if (!id) return;
      const response = await getCategoryById(id);
      setForm({
        name: response.name,
        description: response.description,
      });
    };
    loadCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await updateCategory(id, form);
    navigate("/admin/categories");
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Editar Categoría</h1>
        <p className="text-slate-400">Modifica los detalles de esta categoría.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Nombre</label>
            <input
              name="name"
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
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
