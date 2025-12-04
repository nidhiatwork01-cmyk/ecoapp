import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../context/login-context";
import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAccountDropDownOpen, setIsAccountDropDownOpen] = useState(false);
  const { token, loginDispatch } = useLogin();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Use this for "Login" clicks (go to login page)
  const onLoginClick = () => {
    // close dropdown for nicer UX
    setIsAccountDropDownOpen(false);
    navigate("/auth/login");
  };

  // Use this for "Logout" clicks
  const onLogout = () => {
    // remove token from localStorage (important)
    localStorage.removeItem("token");

    // dispatch logout to update global state
    loginDispatch({ type: "LOGOUT" });

    // close the dropdown and navigate to login
    setIsAccountDropDownOpen(false);
    navigate("/auth/login");
  };

  return (
    <header className="flex bg-green-900 py-4 px-8 text-slate-50">
      <div>
        <h1 onClick={() => navigate("/")} className="text-5xl">
          Shop It
        </h1>
      </div>
      <nav className="ml-auto flex gap-6 items-center">
        <span
          onClick={() => navigate("/wishlist")}
          className="material-symbols-outlined text-3xl hover:cursor-pointer"
        >
          favorite
        </span>
        <span className="text-sm">{wishlist?.length || 0}</span>

        <span
          onClick={() => navigate("/cart")}
          className="material-symbols-outlined text-3xl hover:cursor-pointer"
        >
          shopping_cart
        </span>
        <span>{cart.length}</span>

        <div className="relative">
          <span
            onClick={() => setIsAccountDropDownOpen(!isAccountDropDownOpen)}
            className="material-symbols-outlined text-3xl cursor-pointer"
          >
            account_circle
          </span>

          {isAccountDropDownOpen && (
            <div className="absolute right-0 bg-white text-black shadow-lg p-3 rounded-md w-40">
              {!token?.access_token && (
                <>
                  <p
                    className="cursor-pointer hover:text-green-700"
                    onClick={onLoginClick}            // <-- use the function
                  >
                    Login
                  </p>

                  <p
                    className="cursor-pointer hover:text-green-700 mt-2"
                    onClick={() => {
                      setIsAccountDropDownOpen(false);
                      navigate("/auth/signup");
                    }}
                  >
                    Sign Up
                  </p>
                </>
              )}

              {token?.access_token && (
                <>
                  <p className="cursor-pointer hover:text-green-700">
                    My Account
                  </p>

                  <p
                    className="cursor-pointer hover:text-red-600 mt-2"
                    onClick={onLogout}              // <-- use the function
                  >
                    Logout
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
