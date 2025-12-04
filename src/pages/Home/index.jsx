import { Navbar } from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/getAllProducts";
import { useCart } from "../../context/cart-context";
import { ProductCard } from "../../components/ProductCard";
import { getAllCategories } from "../../api/getAllCategories";
import { getProductsByCategory } from "../../utils/getProductsByCategory";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { cart } = useCart();

  console.log({ cart });
  //useEffect runs ONCE when component loads
  useEffect(() => {
    //immediately invoked async function
    (async () => {
      const products = await getAllProducts();
      const categories = await getAllCategories();
      const updatedCategories = [...categories, { id: "1a", name: "All" }];

      setProducts(products);
      setCategories(updatedCategories);
    })();
  }, []);

  const onCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const filterByCategories = getProductsByCategory(products, selectedCategory);
  return (
    <>
      <Navbar />
      <main className="pt-8">
        <div className="category-list">
          {categories?.length > 0 &&
            categories.map((category) => (
              <div
                className={`category-pill ${
                  selectedCategory === category.name ? "active" : ""
                }`}
                onClick={() => onCategoryClick(category.name)}
              >
                {category.name}
              </div>
            ))}
        </div>

        <div className="product-grid">
          {filterByCategories?.length > 0 ? (
            filterByCategories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <h2>No products found. Please try with another category</h2>
          )}
        </div>
      </main>
    </>
  );
};
