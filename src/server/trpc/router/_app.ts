import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { guestbookRouter } from "./guestbook";
import { productRouter } from "./product";
import { cartRouter } from "./cart";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  guestbook: guestbookRouter,
  products: productRouter,
  cart: cartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
