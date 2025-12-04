import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/getAllProducts";
import { Navbar } from "../../components/Navbar";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const products = await getAllProducts();
      const found = products.find((p) => p.id === Number(id));
      setProduct(found);
    })();
  }, [id]);

  if (!product) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center mt-8">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-80 h-80 object-cover rounded-lg shadow-md"
        />

        <h1 className="text-4xl mt-4">{product.title}</h1>
        <p className="text-xl text-gray-700 mt-2">Rs. {product.price}</p>
        <p className="text-gray-600 mt-4 max-w-lg text-center">
          {product.description}
        </p>
      </main>
    </>
  );
};
