import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import Navbar from "./Navbar";
import { auth } from "../../../firebase/config";
import { useCurrentUser, useUserStoreActions } from "@/app/store/userStore";

export const PrimaryLayout = ({ children }: { children: any }) => {
  const currentUser = useCurrentUser();
  const { setCurrentUser } = useUserStoreActions();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (auth) {
      const getUserApi = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/user?uid=${auth?.currentUser?.uid}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch user");
          }

          const data = await res.json();
          setCurrentUser(data);
        } catch (error) {
          setError(error instanceof Error ? error.message : "Unknown error");
          setLoading(false);
        }
      };
      getUserApi();
    }
  }, [setCurrentUser]);

  return (
    <main className="flex flex-col">
      <section className=" min-h-[100vh] min-w-[100vw] p-4">
        <div className="bg-light-grey shadow-md shadow-ds-pink-200 flex flex-row  rounded-xl ">
          <Navbar />
          {children}
        </div>
      </section>
      <Footer />
    </main>
  );
};
