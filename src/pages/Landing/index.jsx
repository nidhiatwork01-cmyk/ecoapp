import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  const onStart = () => {
    localStorage.setItem("seenLanding", "true");
    navigate("/home");
  };

  return (
    <main className="landing-hero flex flex-col items-center justify-center">
      <div className="landing-inner text-center">
        <h1 className="landing-title">Shop It — Sustainable & Stylish</h1>
        <p className="landing-sub">
          Discover curated products, eco-friendly picks and exclusive deals.
        </p>

        <div className="landing-cta">
          <button onClick={onStart} className="button btn-primary btn-xl">
            Start Shopping
          </button>
          <button
            onClick={() => navigate("/home")}
            className="button btn-outline-primary btn-xl ml-4"
          >
            Browse Products
          </button>
        </div>

        <div className="landing-features mt-8">
          <div className="feature">Fast delivery</div>
          <div className="feature">Secure checkout</div>
          <div className="feature">Wishlist & saved picks</div>
        </div>
      </div>
    </main>
  );
};
