export const wishlistReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_WISHLIST":
      {
        const already = state.wishlist.some((p) => p.id === payload.product.id);
        const updated = already
          ? state.wishlist
          : [...state.wishlist, payload.product];

        // persist
        localStorage.setItem("wishlist", JSON.stringify(updated));
        return { ...state, wishlist: updated };
      }

    case "REMOVE_FROM_WISHLIST":
      {
        const updated = state.wishlist.filter((p) => p.id !== payload.id);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        return { ...state, wishlist: updated };
      }

    case "CLEAR_WISHLIST":
      {
        localStorage.removeItem("wishlist");
        return { ...state, wishlist: [] };
      }

    default:
      return state;
  }
};
