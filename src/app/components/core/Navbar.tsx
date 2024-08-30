import Link from "next/link";
import { auth } from "../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem("user");

  const handleLogout = () => {
    signOut(auth);
    sessionStorage.removeItem("user");
    console.log("logout", auth.currentUser);
  };

  return (
    <nav className=" min-h-[calc(100vh-32px)] flex flex-col gap-8 p-4 min-w-[200px] rounded-xl bg-light-grey overflow-y-scroll">
      <div className="text-lg font-black">LibraryApp</div>
      <div className="flex flex-col gap-4">
        {appPages.map((page, i) => {
          return (
            <Link key={i} href={page.link}>
              {page.name}
            </Link>
          );
        })}
      </div>
      <button
        className="text-red-500"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

const appPages = [
  {
    name: "Dashboard",
    link: "/",
  },
  {
    name: "My Library",
    link: "/MyLibrary",
  },
];
