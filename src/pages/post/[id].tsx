import { useRouter } from "next/router";

const DynamicPostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20">
        <h1 className="text-6xl font-bold">Post</h1>
        <p>{id}</p>
      </main>
    </>
  );
};

export default DynamicPostPage;
