import SearchBar from "../MyLibrary/BookSearch/SearchBar";
import { BookQuote } from "./DahboardComponents/BookQuote";
import { CompletedBooksSpotlight } from "./DahboardComponents/CompletedBooksSpotlight";
import { FavoriteBookSpotlight } from "./DahboardComponents/FavoriteBookSpotLight";

export const Dashboard = () => {
  return (
    <main className="flex flex-col p-4 w-full gap-4 max-h-[calc(100vh-32px)] overflow-hidden">
      <BookQuote />
      <div className="flex flex-col lg:flex-row gap-4 w-fit ">
        <FavoriteBookSpotlight />
        <CompletedBooksSpotlight />
      </div>
    </main>
  );
};
