import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GuestPage from "./pages/GuestPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import { supabase } from "./lib/supabase";
import "./App.css";

function RootRedirect() {
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
    return () => {
      mounted = false;
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

  return <Navigate to={status === "authed" ? "/admin" : "/admin/login"} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/:slug" element={<GuestPage />} />
      </Routes>
    </BrowserRouter>
  );
}