import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import UserSignup from "./pages/UserSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import AdminProduct from "./pages/AdminProduct";
import CreateProduct from "./pages/CreateProduct";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminHome />} />
      <Route path="/admin/product" element={<AdminProduct />} />
      <Route path="/create/product" element={<CreateProduct />} />
      <Route path="/order" element={<OrderPage />} />
    </Routes>
  );
}

export default App;
