import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../context/login-context";
import { useCart } from "../../context/cart-context";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAccountDropDownOpen, setIsAccountDropDownOpen]=useState(false);
  const { token, loginDispatch }=useLogin();
  const { cart }=useCart();

  const onLoginClick=()=>{
    if(token?.access_token){ 
      navigate('/auth/login')
    }
    else{
      loginDispatch({
        type: 'LOGOUT'
      })
      navigate('/auth/login')
    }
  }

  return (
    <header className="flex bg-green-900 py-4 px-8 text-slate-50">
      <div>
        <h1 onClick={() => navigate("/")} className="text-5xl">
          Shop It
        </h1>
      </div>
      <nav className="ml-auto flex gap-6">
        <span
          onClick={() => navigate("/wishlist")}
          class="material-symbols-outlined text-3xl hover:cursor-pointer"
        >
          favorite
        </span>
        <span
          onClick={() => navigate("/cart")}
          class="material-symbols-outlined text-3xl hover:cursor-pointer"
        >
          shopping_cart
        </span>
        <span>
          {cart.length}
        </span>
        <div className="relative">
          <span onClick={()=>setIsAccountDropDownOpen(!isAccountDropDownOpen)} class="material-symbols-outlined text-3xl hover:cursor-pointer">
            account_circle
          </span>
          {
            isAccountDropDownOpen && <div className="absolute bg-green-400"><button onClick={onLoginClick}>
            {
              token?.access_token? 'Logout': 'Login'
            }
            </button></div>
          }
        </div>
      </nav>
    </header>
  );
};
