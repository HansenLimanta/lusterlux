import { FC } from "react";

type ProductItemProps = {
  product: {
    name: string;
    price: number;
    stock: number;
    id: string;
  };
  handleAddProduct: (
    userId: string,
    productId: string,
    quantity: number,
    name: string,
    price: number
  ) => void;
  userId: string;
};

const ProductItem: FC<ProductItemProps> = ({
  product,
  handleAddProduct,
  userId,
}) => {
  const { name, price, stock, id } = product;

  return (
    <div className="mt-3 grid grid-cols-4 place-items-center rounded-md bg-stone-200 px-4 py-2">
      <p>{name}</p>
      <p>{price}</p>
      <p>{stock}</p>
      <button
        className="w-32 rounded-md border border-emerald-700 bg-white p-1"
        onClick={() => handleAddProduct(userId, id, 1, name, price)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
