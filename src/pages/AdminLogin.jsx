import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Credenciales incorrectas. Verificá e intentá de nuevo.");
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="adl">
      <div className="adl-glow adl-glow-tl" />
      <div className="adl-glow adl-glow-br" />

      <div className="adl-panel">
        <div className="adl-logo">
          <div className="adl-monogram">S</div>
          <h1 className="adl-title">Saray XV</h1>
          <p className="adl-subtitle">Panel de administración</p>
        </div>

        <form className="adl-form" onSubmit={handleSubmit}>
          <div className="adl-field">
            <span className="material-symbols-outlined adl-field-icon">person</span>
            <input
              className="adl-input"
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="adl-field">
            <span className="material-symbols-outlined adl-field-icon">key</span>
            <input
              className="adl-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="admin-login-error">{error}</p>}

          <button className="adl-submit" type="submit" disabled={loading}>
            {loading ? "INGRESANDO..." : "ACCEDER AL PORTAL"}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>

        <div className="adl-help">
          <a href="mailto:saray15@gmail.com">¿Necesitas ayuda?</a>
        </div>
      </div>
    </div>
  );
}