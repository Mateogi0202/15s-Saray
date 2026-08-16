import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setStatus(data.session ? "authed" : "guest");
      })
      .catch(() => {
        if (mounted) setStatus("guest");
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setStatus(session ? "authed" : "guest");
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="admin-center">
        <span className="material-symbols-outlined admin-loading-icon">crown</span>
        <p className="admin-loading-text">Cargando...</p>
      </div>
    );
  }

  if (status === "guest") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}