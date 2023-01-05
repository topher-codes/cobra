import { signOut } from "next-auth/react";

const SignIn = () => {
  return (
    <button
      className="my-4 rounded border-4 border-slate-800 p-1 transition hover:border-slate-400 hover:text-slate-400"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default SignIn;
