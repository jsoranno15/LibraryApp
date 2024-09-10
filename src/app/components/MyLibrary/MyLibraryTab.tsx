import SearchBar from "./BookSearch/SearchBar";
import { UserBooks } from "./UserBooks/UserBooks";

export const MyLibraryTab = () => {
  return (
    <main className="flex flex-col px-4 w-full h-screen sm:max-h-[calc(100vh-32px)] ">
      <div className="flex w-full justify-center">
        <SearchBar />
      </div>
      <UserBooks />
      <div className=" w-fit  bg-light-grey h-6 rounded-r-xl"></div>
    </main>
  );
};
