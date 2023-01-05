import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import BackButton from "../../components/BackButton";
import { z } from "zod";
import Image from "next/image";

const DynamicUserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Check if name / email is valid
  const profileSchema = z.object({
    name: z.string().min(1).max(20),
    email: z.string().email(),
    image: z.string().url(),
  });

  // Mutate user data
  const mutateUser = api.profile.update.useMutation();
  const handleSave = () => {
    // Check if name / email is valid
    const profileData = profileSchema.safeParse({
      name: user,
      email: email,
      image: image,
    });
    if (!profileData.success) {
      alert("Invalid name or email");
      return;
    }
    mutateUser.mutate({
      id: id as string,
      name: user as string,
      email: email as string,
      image: image as string,
    });
    setIsEdit(false);
  };

  //isEdit state
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // user data state variables
  const [user, setUser] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [image, setImage] = useState<string | undefined>("");
  const userData = api.profile.getOne.useQuery({ id: id as string });
  useEffect(() => {
    setUser(userData.data?.name);
    setEmail(userData.data?.email || "");
    setImage(userData.data?.image || "");
  }, [userData.data]);

  return (
    <>
      <main className="flex w-full flex-1 flex-col  px-20">
        {!isEdit ? (
          <>
            <h1 className="py-4 text-4xl font-bold">User ID: {id}</h1>
            <p className="py-4 text-2xl font-bold">
              Profile Pic:{" "}
              <Image
                src={userData.data?.image || "/avatarph.webp"}
                width={300}
                height={300}
                alt="Placeholder"
              />
            </p>
            <p className="py-4 text-2xl font-bold">NAME: {user}</p>
            <p className="py-4 text-2xl font-bold">EMAIL: {email}</p>
            <button
              className="my-5 w-20 rounded-md bg-slate-500 p-1 text-white"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <h1 className="py-4 text-4xl font-bold">User ID: {id}</h1>
            <input
              className="py-4 text-2xl font-bold"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <input
              className="py-4 text-2xl font-bold"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              className="py-4 text-2xl font-bold"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="my-5 w-20 rounded-md bg-slate-500 p-1 text-white"
              onClick={handleSave}
            >
              Save
            </button>
          </>
        )}
        <BackButton />
      </main>
    </>
  );
};

export default DynamicUserPage;
