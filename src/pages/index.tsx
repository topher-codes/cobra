import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";

const Home: NextPage = () => {
  const session = useSession();
  return (
    <>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Home</h1>
        {session.data?.user ? (
          <>
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

export default Home;
