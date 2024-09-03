import SearchBar from "./BookSearch/SearchBar";
import { UserBooks } from "./UserBooks/UserBooks";

export const MyLibrary = () => {
  return (
    <main className="flex flex-col px-4 w-full max-h-[calc(100vh-32px)] overflow-hidden">
      <div className="flex w-full justify-center">
        <SearchBar />
      </div>
      <UserBooks />
      <div className=" w-fit  bg-light-grey h-6 rounded-r-xl"></div>
    </main>
  );
};
