import { FC, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { sessionStatusAtom, userIdAtom } from "../pages/_app";

const Navbar: FC = () => {
  const { data: session, status } = useSession();
  const [sessionStatus, setSessionStatus] = useAtom(sessionStatusAtom);
  const [, setUserId] = useAtom(userIdAtom);

  useEffect(() => {
    if (status === "loading") {
      setSessionStatus({ isLogged: false, isLoading: true });
      return;
    }
    if (status === "unauthenticated") {
      setSessionStatus({ isLogged: false, isLoading: false });
      return;
    }
    if (session && status === "authenticated") {
      setSessionStatus({ isLogged: true, isLoading: false });
      setUserId(session?.user?.id || "");
    }
    console.log("session", session);
  }, [session, status]);

  return (
    <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-black.png"
            width={120}
            height={50}
            alt="Lusterlux"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            <li>
              <Link
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
                href="/products"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
                href="/hairmatch"
              >
                HairMatch
              </Link>
            </li>
            <li>
              <Link
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
                href="/tutorials"
              >
                Tutorials
              </Link>
            </li>
            {sessionStatus.isLogged ? (
              <li>
                <Link
                  className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  href="/cart"
                >
                  Cart
                </Link>
              </li>
            ) : (
              <></>
            )}

            <li>
              {sessionStatus.isLogged ? (
                <button
                  className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              ) : (
                <Link
                  className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  href="/login"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
