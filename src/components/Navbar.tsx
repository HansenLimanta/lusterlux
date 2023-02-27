import { FC, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { userAtom } from "../pages/_app";
import NavItem from "./NavItem";
import { role } from "../utils/constant";

const Navbar: FC = () => {
  const { data: session, status } = useSession();
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    if (!session && status === "loading") return;
    if (!session && status === "unauthenticated") {
      setIsLogged(false);
      setUser({ userId: "", role: "" });
      return;
    }
    if (session && status === "authenticated") {
      setIsLogged(true);
      setUser({
        userId: session?.user?.id || "",
        role: session?.user?.role || "",
      });
    }
  }, [session, status]);

  return (
    <nav className="rounded border-b border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-black.png"
            width={120}
            height={50}
            alt="Lusterlux"
          />
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            {isLogged ? (
              user.role === role.admin ? (
                <>
                  <li>
                    <NavItem href="/admin" name="Main Edit" />
                  </li>
                  <li>
                    <NavItem href="/admin/addProduct" name="Add Product" />
                  </li>
                  <li>
                    <button
                      className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavItem href="/products" name="Products" />
                  </li>
                  <li>
                    <NavItem href="/hairmatch" name="HairMatch" />
                  </li>
                  <li>
                    <NavItem href="/tutorial" name="Tutorial" />
                  </li>
                  <li>
                    <NavItem href="/cart" name="Cart" />
                  </li>
                  <li>
                    <button
                      className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )
            ) : (
              <>
                <li>
                  <NavItem href="/products" name="Products" />
                </li>
                <li>
                  <NavItem href="/hairmatch" name="HairMatch" />
                </li>
                <li>
                  <NavItem href="/tutorial" name="Tutorial" />
                </li>
                <li>
                  <NavItem href="/login" name="Login" />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
