import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BookVolume } from "@/types/BookTypes";
import { auth } from "../../../../firebase/config";
import { BookProgress } from "@/types/UserType";
import useUserStore from "@/app/store/userStore";

const SearchBar = () => {
  const { currentUser, setCurrentUser, addBookToCurrentUserLibrary } =
    useUserStore();
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

  const addBookToLibrary = async (book: {
    bookId: string;
    title: string;
    image: string;
    authors: string[];
    genres: string[];
    favorite: boolean;
    progress: BookProgress;
  }) => {
    if (currentUser) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user/addBook`,
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

  console.log("auth.currentUser.uid: ", auth);

  if (auth && auth.currentUser)
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
          <div className="flex flex-row flex-wrap gap-2">
            {books.map((book: BookVolume, index) => {
              return (
                <button
                  key={index}
                  onClick={() =>
                    addBookToLibrary({
                      bookId: book.id,
                      title: book.volumeInfo.title,
                      image: book.volumeInfo.imageLinks.smallThumbnail || "",
                      authors: book.volumeInfo.authors || [],
                      genres: book.volumeInfo.categories || [],
                      favorite: false,
                      progress: {
                        totalPages: book.volumeInfo.pageCount,
                        pagesRead: 0,
                        completed: false,
                      },
                    })
                  }
                >
                  <span>
                    {book?.volumeInfo?.imageLinks?.smallThumbnail && (
                      <Image
                        src={book?.volumeInfo?.imageLinks?.smallThumbnail}
                        height={800}
                        width={800}
                        alt="Picture of the author"
                        className=" hover:scale-125 transition-all duration-300 size-[100px] "
                      ></Image>
                    )}
                  </span>
                  {book?.volumeInfo?.title}
                </button>
              );
            })}
          </div>
        )}
      </>
    );
};

export default SearchBar;
