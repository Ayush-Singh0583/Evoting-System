import "./App.css";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Admin Imports
import Sidebar from "./components/Admin/Sidebar";
import AdminRoute from "./components/Admin/AdminRoute";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import Header from "./components/Admin/Header";

// User Imports
import { LandingPage } from "./pages/LandingPage";
import Home from "./pages/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken"),
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const showSidebar = isAuthenticated;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#F8F9FC]">
        <Header
          isAuthenticated={showSidebar}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <div className="flex flex-1 relative">
          {showSidebar && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
          {showSidebar && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
          <main className="flex-1 w-full p-0">
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />

              {/* Admin Routes */}
              <Route
                path="/admin/login"
                element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
              />
              {/* PROTECTED */}
              <Route path="/admin" element={<AdminRoute />}>
                <Route path="dashboard" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
