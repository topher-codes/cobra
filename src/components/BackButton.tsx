import { useRouter } from "next/router";
import { IoChevronBackCircleSharp } from "react-icons/io5";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="border-2 border-black py-4 text-2xl font-bold"
      onClick={() => router.back()}
    >
      <IoChevronBackCircleSharp className="mr-2 inline-block" />
      Back
    </button>
  );
};

export default BackButton;
