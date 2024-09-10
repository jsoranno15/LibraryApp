import Link from "next/link";
import { auth } from "../../../firebase/config";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { DashboardIcon, LibraryIcon, LogoutIcon } from "@/app/icons";
import { useCurrentUser, useUserStoreActions } from "@/app/store/userStore";
import { ReactElement } from "react";

const Navbar = () => {
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
    <nav
      className="hidden min-h-[calc(100vh-32px)] sm:flex flex-col  justify-between  border-r 
    border-gray-200 min-w-[300px]   rounded-l-xl  "
    >
      <div className="flex flex-col gap-8 p-6">
        <div className="text-lg font-black">Library App</div>
        <div className="flex flex-col gap-4">
          {appPages.map((page, i) => {
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
                {page.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t items-center  flex flex-row justify-between gap-1 p-6">
        <div className="truncate w-3/4">{currentUser?.email}</div>
        <button
          className=" w-fit h-fit aspect-square p-[5px] bg-ds-red-100  items-center justify-center rounded-full"
          onClick={() => {
            handleLogout();
          }}
        >
          <span className="text-ds-red-400 flex size-[20px]">
            <LogoutIcon />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

export interface AppPage {
  name: string;
  link: string;
  icon: ReactElement;
}

export const appPages = [
  {
    name: "Dashboard",
    link: "/",
    icon: (
      <span className="flex size-5">
        <DashboardIcon />
      </span>
    ),
  },
  {
    name: "My Library",
    link: "/MyLibrary",
    icon: (
      <span className="flex size-5">
        <LibraryIcon />
      </span>
    ),
  },
];
