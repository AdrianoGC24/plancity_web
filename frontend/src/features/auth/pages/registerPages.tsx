import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/events");
    } catch (error: any) {
      setError(error.response?.data?.message || "Error registrando usuario");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <form
        onSubmit={handleSubmit}
        className="glass-panel p-10 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            Crear Cuenta
          </h1>
          <p className="text-slate-400 mt-2">Únete a PlanCity hoy</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Nombre Completo</label>
            <input
              name="name"
              placeholder="Juan Pérez"
              value={form.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Correo Electrónico</label>
            <input
              name="email"
              type="email"
              placeholder="tu@correo.com"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Contraseña</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">
              {error}
            </div>
          )}

          <button type="submit" className="w-full btn-primary mt-2 py-3 text-lg">
            Registrarse
          </button>
        </div>

        <div className="mt-6 text-center text-slate-400 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}
