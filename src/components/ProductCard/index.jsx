import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";
import { findProductInWishlist } from "../../utils/findProductInWishlist";
import { findProductInCart } from "../../utils/findProductInCart";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const { cart, cartDispatch } = useCart();
  const { wishlist, wishlistDispatch } = useWishlist();

  const navigate = useNavigate();

  const isProductInCart = findProductInCart(cart, product.id);
  const isProductInWishlist = findProductInWishlist(wishlist, product.id);

  const onCartClick = (product) => {
    if (!isProductInCart) {
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      cartDispatch({
        type: "ADD_TO_CART",
        payload: { product },
      });
    } else {
      navigate("/cart");
    }
  };

  const onWishlistClick = (product) => {
    if (!isProductInWishlist) {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: { product },
      });
    } else {
      // user already has it — go to wishlist
      navigate("/wishlist");
    }
  };

  return (
    <div className="card card-vertical d-flex direction-column relative shadow">
      <div className="card-image-container">
        <img className="card-image" src={product.images[0]} alt="shoes" />
      </div>

      <div className="card-details">
        <div className="card-des">{product.title}</div>

        <div className="card-description">
          <p className="card-price">Rs. {product.price}</p>
        </div>

        <div className="cta-btn">
          <button
            onClick={() => onWishlistClick(product)}
            className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin"
          >
            <span className="material-symbols-outlined">favorite</span>
            {isProductInWishlist ? "Go to Wishlist" : "Add To Wishlist"}
          </button>
          <button
            onClick={() => onCartClick(product)}
            className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin"
          >
            <span className="material-symbols-outlined">
              {isProductInCart ? "shopping_cart_checkout" : "shopping_cart"}
            </span>
            {isProductInCart ? "Go to Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
