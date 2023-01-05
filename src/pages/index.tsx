import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { api } from "../utils/api";
import { useState } from "react";

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
            <PostForm />
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

const PostForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const mutation = api.post.create.useMutation();
  const session = useSession();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (session.data?.user) {
      mutation.mutate({
        title,
        content: body,
        authorId: session.data.user.id,
        authorName: session.data.user.name,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <label htmlFor="title">Title</label>
      <input
        className="mb-2 border"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="body">Body</label>
      <input
        className="mb-2 border"
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        className="w-full rounded border-4 border-slate-800 p-1 hover:border-slate-400"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
