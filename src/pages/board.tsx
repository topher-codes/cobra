import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import { api } from "../utils/api";

const BoardPage = () => {
  const session = useSession();

  const result = api.post.getAll.useQuery();

  return (
    <>
      <main className="flex w-full ">
        <div className="flex w-20  flex-col">
          <h1 className="mx-4 text-6xl font-bold">Stats</h1>
          <div className=" mx-4 flex h-full w-40 flex-col border-4">
            <p>Users</p>
            <p>TODO</p>
            <ul>
              <li>Add users</li>
            </ul>
          </div>
        </div>
        <div className="mx-40 flex w-full flex-1 flex-col items-center justify-center">
          {session.data?.user ? (
            <>
              {result.data?.map((post) => (
                <Link
                  className="my-4 min-w-full border-4 border-black p-4"
                  key={post.id}
                  href={`/post/${post.id}`}
                >
                  <h2 className="text-3xl">{post.title}</h2>
                  <p className="text-xs">
                    By {post.authorName}
                    <Image
                      className="rounded-full"
                      src={post.authorImage}
                      width={30}
                      height={30}
                      alt="Nothing"
                    />
                  </p>
                </Link>
              ))}
              <p>You are signed in</p>
              <SignOut />
            </>
          ) : (
            <>
              <p>You are not signed in</p>
              <SignIn />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default BoardPage;
