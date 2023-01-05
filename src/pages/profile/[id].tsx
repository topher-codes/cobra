import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import BackButton from "../../components/BackButton";

const DynamicUserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const userData = api.profile.getOne.useQuery({ id: id as string });
  useEffect(() => {
    setUser(userData.data?.name);
    setEmail(userData.data?.email);
  }, [userData.data]);

  return (
    <>
      <main className="flex w-full flex-1 flex-col  px-20">
        <h1 className="py-4 text-4xl font-bold">User ID: {id}</h1>
        <p className="py-4 text-2xl font-bold">NAME: {user}</p>
        <p className="py-4 text-2xl font-bold">EMAIL: {email}</p>
        <BackButton />
      </main>
    </>
  );
};

export default DynamicUserPage;
