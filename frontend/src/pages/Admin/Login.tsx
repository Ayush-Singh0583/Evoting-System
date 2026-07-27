import { useState } from "react";
import { adminLogin } from "../../utils/Admin/api/auth";
import { useNavigate, Navigate } from "react-router-dom";

export default function AdminLogin({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) {
  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const [username, setUsername] = useState("");
  const [totp, setTotp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !totp) return;

    try {
      setLoading(true);
      const res = await adminLogin({
        username,
        password: totp,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Admin Login
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Secure access to the dashboard
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="TOTP"
              value={totp}
              onChange={(e) => setTotp(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm
                         tracking-widest text-center
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-blue-600 py-2.5 text-white
                       font-semibold hover:bg-blue-700
                       active:scale-[0.98] transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-400 text-center mt-6">
          Protected admin access
        </p>
      </div>
    </div>
  );
}
