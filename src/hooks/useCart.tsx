import { useCartContext } from "~/contexts/cartContext";
import { ProductWithImage } from "~/types";

export default function useCart() {
  const { cart, setCart, cartTotal } = useCartContext();

  function addProduct(product: ProductWithImage) {
    setCart((prev) => [...prev, product]);
  }

  function removeProduct(id: number) {
    const filteredProducts = cart.filter((product) => product.id !== id);

    setCart(filteredProducts);
  }

  return {
    cart,
    cartTotal,
    addProduct,
    removeProduct,
  };
}
