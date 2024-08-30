import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { BookVolume } from "@/types/BookTypes";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<BookVolume[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const searchForBook = (query: string) => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      )
      .then((res) => {
        console.log("success", res.data.items);
        setBooks(res.data.items);
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <>
      <div className="flex items-center justify-center p-4">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchForBook(query);
            }
          }}
          placeholder="Search..."
          className="border border-gray-300 rounded-l-lg px-4 py-2 w-full sm:w-64 focus:outline-none"
        />
        <button
          onClick={() => searchForBook(query)}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </div>
      {books && (
        <div className="flex flex-col gap-2">
          {books.map((book: BookVolume, index) => {
            return (
              <div key={index}>
                <span>
                  {book?.volumeInfo?.imageLinks?.smallThumbnail && (
                    <Image
                      src={book?.volumeInfo?.imageLinks?.smallThumbnail}
                      height={800}
                      width={800}
                      alt="Picture of the author"
                      className=" object-cover  h-fit w-fit "
                    ></Image>
                  )}
                </span>
                {book?.volumeInfo?.title}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchBar;
