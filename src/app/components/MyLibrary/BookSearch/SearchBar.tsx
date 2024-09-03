import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BookVolume } from "@/types/BookTypes";
import { auth } from "../../../../firebase/config";
import { Book, BookProgress } from "@/types/UserType";
import useUserStore from "@/app/store/userStore";
import BookSearchDropdown from "./BookSearchDropdown";

const SearchBar = () => {
  const { currentUser, setCurrentUser, addBookToCurrentUserLibrary } =
    useUserStore();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<BookVolume[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    searchForBook(query);
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
    setShowDropdown(true);
  };

  const addBookToLibrary = async (book: Book) => {
    if (currentUser) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user/book`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: currentUser.uid, book }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to add book to library");
        }

        // refetch get user
        addBookToCurrentUserLibrary(book);
      } catch (error: any) {
        console.error("Error adding book to library:", error.message);
      }
    }
  };

  const handleClickOutside = () => {
    setShowDropdown(false);
  };

  console.log("auth.currentUser.uid: ", auth);

  if (auth && auth.currentUser)
    return (
      <div className="flex relative items-center justify-center w-[350px] py-4">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchForBook(query);
            }
          }}
          placeholder="Search by title..."
          className={`border  rounded-l-xl px-4 py-2 w-full focus:outline-none ${
            showDropdown && "rounded-b-none"
          }`}
        />
        <button
          onClick={() => searchForBook(query)}
          className={`bg-ds-dark-purple-400 transition-all duration-150 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600 focus:outline-none ${
            showDropdown && "rounded-b-none"
          }`}
        >
          Search
        </button>
        {showDropdown && (
          <BookSearchDropdown
            showDropdown={showDropdown}
            books={books}
            onClick={handleClickOutside}
            addBookToLibrary={addBookToLibrary}
          />
        )}
      </div>
    );
};

export default SearchBar;
