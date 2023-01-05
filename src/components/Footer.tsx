import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <footer className="flex items-center justify-between bg-white py-6 px-4 dark:bg-gray-900 md:px-20 xl:px-40">
      <div className="flex flex-col">
        <p>(+62) 822-2516-9086</p>
        <p>Instagram: @peachygirlstore</p>
        <p>Line@: @peachygirlstore</p>
        <p>&copy;2023 Lusterlux. All Right Reserved</p>
      </div>
      <div className="flex flex-col">
        <Link className="hover:text-emerald-600" href="/home">
          Home
        </Link>
        <Link className="hover:text-emerald-600" href="/products">
          Products
        </Link>
        <Link className="hover:text-emerald-600" href="/hairmatch">
          Hairmatch
        </Link>
        <Link className="hover:text-emerald-600" href="/tutorials">
          Tutorials
        </Link>
      </div>
      <div className="flex flex-col items-center gap-2">
        <a className="" href="#" target="_blank" rel="noopener noreferrer">
          <Image src="/shopee.png" height={50} width={200} alt="shopee" />
        </a>
        <a className="p-1" href="#" target="_blank" rel="noopener noreferrer">
          <Image src="/tokopedia.png" height={50} width={150} alt="tokopedia" />
        </a>
        <div className="mt-2 flex w-full justify-evenly">
          <a className="" href="#" target="_blank" rel="noopener noreferrer">
            <Image
              src="/instagram.png"
              height={30}
              width={30}
              alt="instagram"
            />
          </a>
          <a className="" href="#" target="_blank" rel="noopener noreferrer">
            <Image src="/whatsapp.png" height={30} width={30} alt="whatsapp" />
          </a>
          <a className="" href="#" target="_blank" rel="noopener noreferrer">
            <Image src="/tiktok.png" height={30} width={30} alt="tiktok" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
