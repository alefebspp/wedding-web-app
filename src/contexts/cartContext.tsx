import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from "react";
import { ProductWithImage } from "~/types";

export interface CartContextProps {
  cart: ProductWithImage[];
  setCart: Dispatch<SetStateAction<ProductWithImage[]>>;
  cartTotal: number;
  showSummary: boolean;
  setShowSummary: Dispatch<SetStateAction<boolean>>;
}

interface CartContextProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartContextProvider: FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cart, setCart] = useState<ProductWithImage[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce((acc, product) => {
        if (product.price) {
          return acc + product.price;
        }
        return 0;
      }, 0);
      setCartTotal(total);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartTotal,
        showSummary,
        setShowSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCartContext must be used within an CartContextProvider",
    );
  }

  return context;
};
