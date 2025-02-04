import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRegister from "./components/pages/UserRegister";
import UserLogin from "./components/pages/UserLogin";
import { Toaster } from "sonner";
import UserProfile from "./components/pages/UserProfile";
import { getStorageItem } from "./lib/utils";
function App() {
  const token = getStorageItem("token");

  const registerRoute = () => {
    if (token) {
      return <Navigate to="/profile" />;
    }
    return <Navigate to="/register" />;
  };

  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={registerRoute()} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
