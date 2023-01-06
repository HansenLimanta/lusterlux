import { router } from "../trpc";
import { productRouter } from "./product";
import { cartRouter } from "./cart";

export const appRouter = router({
  products: productRouter,
  cart: cartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
