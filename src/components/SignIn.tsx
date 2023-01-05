import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <button
      className="rounded border-4 border-slate-800 p-1 transition hover:border-slate-400 hover:text-slate-400"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
};

export default SignIn;
