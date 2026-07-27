import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Network,
  User,
  LogOut,
  FileText,
  Settings
} from "lucide-react";
import { adminLogout } from "../../utils/Admin/api/auth";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setIsAuthenticated: (value: boolean) => void;
}

export default function Sidebar({ isOpen, onClose, setIsAuthenticated }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminLogout(); // invalidate refresh token + clear cookie
    } catch (e) {
      // even if backend fails, force logout locally
    } finally {
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  };

  const location = useLocation();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Voters", href: "/admin/Voters", icon: <User size={20} /> },
    { label: "Candidates", href: "/admin/Candidates", icon: <Network size={20} /> },
    { label: "Settings", href: "/admin/Settings", icon: <Settings size={20} /> }
  ];

  return (
    <>
      {/* Overlay for mobile/desktop when drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 shadow-xl z-50 transition-transform duration-300 ease-in-out w-64 pt-16
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col
        `}
      >
        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
              >
                <div
                  className={`transition-colors ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t border-slate-100">
          <div className="relative group">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 truncate">
                  admin@academiflow.com
                </p>
              </div>
            </button>

            {/* Dropdown/Up Menu */}
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-bottom">
              <div className="p-1">
                <button className="flex items-center w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors">
                  <FileText size={16} className="mr-3" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
