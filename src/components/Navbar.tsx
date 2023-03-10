import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const session = useSession();
  return (
    <nav className="flex flex-wrap items-center justify-between bg-teal-400 p-6 text-black">
      <div className="mr-6 flex flex-shrink-0 items-center">
        <span className="text-3xl font-semibold tracking-tight">
          <Link href="/">Cobra</Link>
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center rounded border border-gray-400 px-3 py-2 text-gray-200 hover:border-white ">
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-2xl lg:flex-grow">
          <Link
            href="/board"
            className="mt-4 mr-4 block text-black hover:text-white lg:mt-0 lg:inline-block"
          >
            Board
          </Link>
          <Link
            href={`/profile/${session.data?.user?.id}`}
            className="mt-4 mr-4 block text-black hover:text-white lg:mt-0 lg:inline-block"
          >
            <span>Profile</span>
          </Link>
          <Link
            href="/form"
            className="mt-4 mr-4 block text-black hover:text-white lg:mt-0 lg:inline-block"
          >
            <span>Post</span>
          </Link>
          <Link href="/create">
            <span className="mt-4 mr-4 block text-black hover:text-white lg:mt-0 lg:inline-block">
              Create
            </span>
          </Link>
        </div>
        <Image
          src={session.data?.user?.image || "/avatarph.webp"}
          width={50}
          height={50}
          alt="ProfileImage"
          className="rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
