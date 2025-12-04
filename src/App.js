import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { AuthLogin } from "./pages/AuthLogin";
import { Wishlist } from "./pages/Wishlist";
import { Landing } from "./pages/Landing";
import { AuthSignup } from "./pages/AuthSignup";
import { ProductDetails } from "./pages/ProductDetails";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/auth/login" element={<AuthLogin />} />
      <Route path="/auth/signup" element={<AuthSignup />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
