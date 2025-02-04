import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegister from "./components/pages/UserRegister";
import UserLogin from "./components/pages/UserLogin";
import { Toaster } from "sonner";
function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
