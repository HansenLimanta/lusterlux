import { FC, useState } from "react";
import { trpc } from "../utils/trpc";
import { MdDeleteOutline } from "react-icons/md";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { formatMoney } from "../utils/utilsFunction";
import { useAtom } from "jotai";
import { cartAtom } from "../pages/_app";

type CartItemProps = {
  product: {
    name: string;
    price: number;
    quantity: number;
    id: string;
    userId: string;
    productId: string;
  };
};

const CartItem: FC<CartItemProps> = ({ product }) => {
  const { name, quantity, id, productId, userId, price } = product;
  const [isOnMutate, setIsOnMutate] = useState(false);
  const [cartList, setCartList] = useAtom(cartAtom);
  const utils = trpc.useContext();

  const deleteSingleItem = trpc.cart.deleteSingleCartItem.useMutation({
    onSuccess: () => {
      utils.cart.getCartItems.invalidate().then(() => {
        setIsOnMutate(false);
      });
    },
  });
  const addSingleItem = trpc.cart.addCartItem.useMutation({
    onSuccess: () => {
      utils.cart.getCartItems.invalidate().then(() => {
        setIsOnMutate(false);
      });
    },
  });
  const deleteItem = trpc.cart.deleteCartItem.useMutation({
    onSuccess: () => {
      utils.cart.getCartItems.invalidate().then(() => {
        setIsOnMutate(false);
      });
    },
  });

  const handleDeleteSingle = () => {
    setIsOnMutate(true);
    deleteSingleItem.mutate({ id });
  };
  const handleDeleteItem = () => {
    setIsOnMutate(true);
    deleteItem.mutate({ id });
  };
  const handleAddSingle = () => {
    setIsOnMutate(true);
    addSingleItem.mutate({
      userId: userId,
      productId: productId,
      quantity: 1,
      name,
      price,
    });
  };

  return (
    <>
      <tr
        className={`${
          isOnMutate
            ? "pointer-events-none animate-pulse border-b bg-gray-700/20"
            : "border-b bg-white dark:border-gray-700 dark:bg-gray-800"
        }`}
      >
        <th
          scope="row"
          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
        >
          {name}
        </th>
        <td className="px-6 py-4">IDR {formatMoney(price)}</td>
        <td className="flex w-full justify-between gap-1 px-6 py-4 ">
          <button className="w-4" onClick={handleDeleteSingle}>
            <FiMinusSquare size={18} />
          </button>
          <p>{quantity}</p>
          <button className="w-4 " onClick={handleAddSingle}>
            <FiPlusSquare size={18} />
          </button>
        </td>
        <td className="px-6 py-4">IDR {formatMoney(price * quantity)}</td>
        <td className="px-6 py-4">
          <button
            className="w-6 rounded-md border border-red-600 bg-white p-1 hover:bg-red-200"
            onClick={handleDeleteItem}
          >
            <MdDeleteOutline className="text-red-600" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
