import SearchBar from "../Dashboard/DahboardComponents/SearchBar";
import { UserBooks } from "./UserBooks";

export const MyLibrary = () => {
  return (
    <main className="flex flex-col px-4 w-full  ">
      <SearchBar />
      <UserBooks />
    </main>
  );
};
