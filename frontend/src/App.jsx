import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Admin from "./pages/Admin";

import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Main />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
