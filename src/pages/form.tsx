import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import { api } from "../utils/api";

const FormPage: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [finished, setFinished] = useState<boolean>(false);
  const mutation = api.post.create.useMutation();
  const session = useSession();
  const authorId = session.data?.user?.id || "";
  const name = session.data?.user?.name || "Anonymous";
  const authorImage = session.data?.user?.image || "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session.data?.user) {
      mutation.mutate({
        title,
        content: body,
        authorId: authorId,
        authorName: name,
        authorImage: authorImage,
      });
    }
    setFinished(true);
  };

  return (
    <>
      {session.data?.user ? (
        !finished ? (
          <div className="min-h-screen bg-slate-200">
            <div className="flex min-h-screen flex-col items-center justify-center">
              <form
                className="flex flex-col items-center justify-center"
                onSubmit={handleSubmit}
              >
                <label
                  htmlFor="title"
                  className="text-2xl font-bold text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="min-w-full rounded-md border-2 border-gray-300 p-2"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label
                  htmlFor="content"
                  className="text-2xl font-bold text-gray-900"
                >
                  Content
                </label>
                <textarea
                  name="content"
                  id="content"
                  cols={50}
                  rows={10}
                  className="rounded-md border-2 border-gray-300 p-2"
                  onChange={(e) => setBody(e.target.value)}
                />
                <button
                  type="submit"
                  className="rounded-md bg-teal-400 p-2 text-white"
                >
                  Post
                </button>
              </form>

              <SignOut />
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-slate-200">
            <div className="flex min-h-screen flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-gray-900">
                Thanks for Posting!
              </h1>
            </div>
          </div>
        )
      ) : (
        <div className="min-h-screen bg-slate-200">
          <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-900">
              You must be signed in to view this page
            </h1>
            <SignIn />
          </div>
        </div>
      )}
    </>
  );
};

export default FormPage;
