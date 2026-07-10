import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DriverDashboard from "./pages/driver/DriverDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/driver" element={<DriverDashboard />} />
      <Route path="/customer" element={<CustomerDashboard />} />
    </Routes>
  );
}

export default App;