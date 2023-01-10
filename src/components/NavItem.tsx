import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type NavItemProps = {
  name: string;
  href: string;
};

const NavItem: FC<NavItemProps> = ({ href, name }) => {
  // make the current page's nav item active different color
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <>
      {isActive ? (
        <Link
          className="block rounded py-2 pl-3 pr-4 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-400 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
          href={href}
        >
          {name}
        </Link>
      ) : (
        <Link
          className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600 md:dark:hover:bg-transparent md:dark:hover:text-white"
          href={href}
        >
          {name}
        </Link>
      )}
    </>
  );
};

export default NavItem;
