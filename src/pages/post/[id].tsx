import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import BackButton from "../../components/BackButton";

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
      <main className="flex w-full flex-1 flex-col  px-20">
        <h1 className="py-4 text-4xl font-bold">Post ID: {id}</h1>
        <p className="py-4 text-2xl font-bold">TITLE: {post}</p>
        <p className="py-4 text-2xl font-bold">CONTENT: {content}</p>
        <BackButton />
      </main>
    </>
  );
};

export default DynamicPostPage;
