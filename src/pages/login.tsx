import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Meta from "../components/Meta";

const LoginPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <>
      <Meta />
      <main className="mt-24 flex flex-col items-center">
        <h1 className="pt-4 text-3xl">Login</h1>
        <p>Choose account to login with</p>
        <div className="mt-10 flex w-80 flex-col gap-6">
          <button
            className="flex items-center justify-center gap-2 rounded-lg border border-black py-2 hover:border-emerald-600 hover:text-emerald-600"
            onClick={() => signIn("discord", { callbackUrl: "/" })}
          >
            <Image src="/discord.png" width={24} height={24} alt="discord" />
            Login with Discord
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-lg border border-black py-2 hover:border-emerald-600 hover:text-emerald-600 "
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <Image src="/google.png" width={24} height={24} alt="google" />
            Login with Google
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-lg border border-black py-2 hover:border-emerald-600 hover:text-emerald-600"
            onClick={() => signIn("instagram", { callbackUrl: "/" })}
          >
            <Image
              src="/instagram.png"
              width={24}
              height={24}
              alt="instagram"
            />
            Login with Instagram
          </button>
          <div className="pt-10" />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
