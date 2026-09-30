import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "../../categories/services/categoryService";
import type { CategoryResponse } from "../../../types/category";

export default function AdminCategories() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar esta categoría?")) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Gestión de Categorías</h1>
          <p className="text-slate-400 mt-1">Administra las categorías de los eventos</p>
        </div>
        <Link
          to="/admin/categories/create"
          className="btn-primary flex items-center gap-2"
        >
          <span>➕</span> Nueva Categoría
        </Link>
      </div>

      <div className="glass-panel overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-400">Cargando categorías...</div>
        ) : categories.length === 0 ? (
          <div className="p-10 text-center text-slate-400">No hay categorías registradas.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-700/50">
                  <th className="p-5 font-semibold text-slate-300">Nombre</th>
                  <th className="p-5 font-semibold text-slate-300">Descripción</th>
                  <th className="p-5 font-semibold text-center text-slate-300">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-5 text-white font-medium">{category.name}</td>
                    <td className="p-5 text-slate-400">{category.description}</td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/admin/categories/edit/${category.id}`}
                          className="px-3 py-1.5 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-lg text-sm font-medium transition-colors border border-amber-500/20"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(category.id)}
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
