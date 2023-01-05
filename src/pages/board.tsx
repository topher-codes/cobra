import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
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
              <div key={post.id} className="min-w-full border p-4">
                <h2 className="text-3xl">
                  <Link href={`/post/${post.title}`}>{post.title}</Link>
                </h2>
                <p>{post.content}</p>
                <p>{post.authorName}</p>
              </div>
            ))}
            {JSON.stringify(result.data)}
            <p>You are signed in</p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <p>You are not signed in</p>
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </main>
    </>
  );
};

export default BoardPage;
