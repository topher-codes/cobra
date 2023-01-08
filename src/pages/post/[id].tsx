import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import BackButton from "../../components/BackButton";
import { useSession } from "next-auth/react";

const DynamicPostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");
  const postData = api.post.getOne.useQuery({ id: id as string });
  useEffect(() => {
    setPost(postData.data?.title);
    setContent(postData.data?.content);
  }, [postData.data]);

  return (
    <>
      <main
        className="flex 
       w-full flex-1 flex-col px-20"
      >
        <div className="  min-h-screen border-4 border-slate-800">
          <h1 className="py-4 text-4xl font-bold">Post ID: {id}</h1>
          <p className="py-4 text-2xl font-bold">TITLE: {post}</p>
          <p className="py-4 text-2xl font-bold">CONTENT: {content}</p>
        </div>
        <CommentSection />
        <PostComment />
        <BackButton />
      </main>
    </>
  );
};

export default DynamicPostPage;

// React component for commenting on the post
const CommentSection = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = api.comment.getPostComments.useQuery({
    id: id as string,
  });

  return (
    <>
      <div className="flex w-full flex-col ">
        <h1 className=" py-4 text-4xl font-bold">Comments</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Something went wrong</p>
        ) : (
          data?.map((comment) => (
            <div
              className="my-2 flex w-full flex-col border-4"
              key={comment.id}
            >
              <p className="py-4 font-bold">{comment.content}</p>
              <p className="py-4 font-bold">By: {comment.authorName}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

// React component to post a comment on the current post
const PostComment = () => {
  const session = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState<string | undefined>("");
  const { mutate } = api.comment.create.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      postId: id as string,
      content: content as string,
      authorId: session.data?.user?.id as string,
      authorName: session.data?.user?.name as string,
    });
    router.reload();
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <h1 className="py-4 text-4xl font-bold">Post Comment</h1>
        <form onSubmit={handleSubmit} className="my-4 flex">
          <textarea
            placeholder="Comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-20 w-full border-4 border-slate-800"
          />
          <button className=" border border-black p-4" type="submit">
            <div className="text-2xl">Submit</div>
          </button>
        </form>
      </div>
    </>
  );
};
