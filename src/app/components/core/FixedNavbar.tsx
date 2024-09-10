import Link from "next/link";
import { useRouter } from "next/router";
import { AppPage, appPages } from "./Navbar";
import { LogoutIcon } from "@/app/icons";
import { auth } from "../../../firebase/config";
import { useCurrentUser, useUserStoreActions } from "@/app/store/userStore";
import { signOut } from "firebase/auth";

export const FixedNavbar = () => {
  const currentUser = useCurrentUser();
  const { setCurrentUser } = useUserStoreActions();
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth);
    setCurrentUser(null);
    sessionStorage.removeItem("user");
    setCurrentUser(null);
    // console.log("logout", auth.currentUser);
  };
  return (
    <div className="sm:hidden fixed bottom-0 h-20 bg-white w-full p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          {appPages.map((page: AppPage, i: number) => {
            return (
              <Link
                key={i}
                href={page.link}
                className={`rounded-full py-2 px-3 transition-all duration-150 flex flex-row items-center gap-3
                 ${
                   router.pathname === page.link
                     ? " bg-ds-dark-purple-100"
                     : "hover:bg-ds-dark-purple-50"
                 }`}
              >
                {<span>{page.icon}</span>}
              </Link>
            );
          })}
        </div>
        <button
          className=" w-fit h-fit aspect-square p-[5px] bg-ds-red-100  items-center justify-center rounded-full"
          onClick={() => {
            handleLogout();
          }}
        >
          <span className="text-ds-red-400 flex size-7">
            <LogoutIcon />
          </span>
        </button>
      </div>
    </div>
  );
};
