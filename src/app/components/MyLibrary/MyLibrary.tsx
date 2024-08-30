import SearchBar from "../Dashboard/DahboardComponents/SearchBar";
import { UserBooks } from "./UserBooks";

export const MyLibrary = () => {
  return (
    <main className="flex flex-col">
      <SearchBar />
      <UserBooks />
    </main>
  );
};
