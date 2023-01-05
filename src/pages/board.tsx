import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import { api } from "../utils/api";

const BoardPage = () => {
  const session = useSession();

  const result = api.post.getAll.useQuery();

  return (
    <>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20">
        <h1 className="text-6xl font-bold">Board</h1>
        {session.data?.user ? (
          <>
            {result.data?.map((post) => (
              <Link
                className="my-4 min-w-full border-4 p-4"
                key={post.id}
                href={`/post/${post.id}`}
              >
                <h2 className="text-3xl">{post.title}</h2>
                <p>{post.content}</p>
                <p className="text-xs">By {post.authorName}</p>
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
      </main>
    </>
  );
};

export default BoardPage;
