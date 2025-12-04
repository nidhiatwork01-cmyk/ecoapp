import { Navbar } from "../../components/Navbar";
import { useWishlist } from "../../context/wishlist-context";
import { useNavigate } from "react-router-dom";

export const Wishlist = () => {
  const { wishlist, wishlistDispatch } = useWishlist();
  const navigate = useNavigate();

  const onRemove = (id) => {
    wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: { id } });
  };

  return (
    <>
      <Navbar />
      <main className="pt-8 flex flex-col items-center">
        <h2 className="text-4xl mb-4">My Wishlist</h2>

        {wishlist?.length > 0 ? (
          <div className="flex gap-8 flex-wrap justify-center">
            {wishlist.map((product) => (
              <div key={product.id} className="card card-vertical shadow">
                <div className="card-image-container">
                  <img className="card-image" src={product.images[0]} alt={product.title} />
                </div>
                <div className="card-details">
                  <div className="card-des">{product.title}</div>
                  <div className="card-description">
                    <p className="card-price">Rs. {product.price}</p>
                  </div>
                  <div className="cta-btn">
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="button btn-outline-primary btn-icon"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="button btn-primary btn-icon"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl">Your wishlist is empty</h3>
            <p className="mt-2">
              Browse products and add your favourites.{" "}
              <span className="underline hover:cursor-pointer" onClick={() => navigate("/home")}>
                Start Shopping
              </span>
            </p>
          </div>
        )}
      </main>
    </>
  );
};
