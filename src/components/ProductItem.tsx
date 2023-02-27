import { FC, useState } from "react";
import { trpc } from "../utils/trpc";
import Spinner from "./Spinner";

type ProductItemProps = {
  product: {
    name: string;
    price: number;
    stock: number;
    id: string;
  };
  userId: string;
  handleNeedToLogin: () => void;
};

const ProductItem: FC<ProductItemProps> = ({
  product,
  userId,
  handleNeedToLogin,
}) => {
  const { name, price, stock, id } = product;
  const [isAdding, setIsAdding] = useState(false);
  const utils = trpc.useContext();
  const addToCart = trpc.cart.addCartItem.useMutation({
    onSuccess: () => {
      utils.cart.getCartItems.invalidate();
      setIsAdding(false);
    },
    onError: (e) => {
      setIsAdding(false);
      handleNeedToLogin();
    },
  });

  const handleAddProduct = (
    userId: string,
    productId: string,
    quantity: number,
    name: string,
    price: number
  ) => {
    setIsAdding(true);
    addToCart.mutate({ userId, productId, quantity, name, price });
  };

  return (
    <div className="mt-3 grid grid-cols-4 place-items-center rounded-md bg-stone-200 px-4 py-2">
      <p>{name}</p>
      <p>{price}</p>
      <p>{stock}</p>
      <button
        className={`${
          isAdding ? "pointer-events-none cursor-auto" : "cursor-pointer"
        } flex w-32 items-center justify-center rounded-md border border-emerald-700 bg-white p-1`}
        onClick={() => handleAddProduct(userId, id, 1, name, price)}
      >
        {isAdding ? <Spinner /> : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductItem;
