import SearchBar from "../MyLibrary/BookSearch/SearchBar";
import { BookQuote } from "./DahboardComponents/BookQuote";

export const Dashboard = () => {
  return (
    <main className="flex flex-col p-4 w-full  max-h-[calc(100vh-32px)] overflow-hidden">
      <BookQuote />
    </main>
  );
};
