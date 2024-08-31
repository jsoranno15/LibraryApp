import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import Image from "next/image";
import useUserStore from "@/app/store/userStore";
import { BookCard } from "../core/BookCard";
interface Book {
  _id: string;
  title: string;
  author: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export const UserBooks = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser, setCurrentUser, removeBookFromCurrentUserLibrary } =
    useUserStore();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user?uid=${auth?.currentUser?.uid}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();
        setCurrentUser(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchBooks();
  }, [setCurrentUser]);

  const removeBookFromLibrary = async (bookId: string) => {
    if (currentUser) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user/deleteBook`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: currentUser.uid, bookId }),
          }
        );
        removeBookFromCurrentUserLibrary(bookId);
      } catch (error) {
        throw new Error("Could not delete book.");
      }
    }
  };

  console.log("user: ", currentUser);

  console.log("books: ", currentUser?.library);
  return (
    <div className="bg-light-grey flex flex-col gap-5 rounded-xl p-4  w-full h-full overflow-y-hidden">
      <span className="font-bold text-lg">Your Library:</span>
      <div className="flex flex-row gap-5 flex-wrap transition-all duration-300 overflow-scroll">
        {currentUser?.library.map((book, i) => (
          <BookCard
            key={i}
            book={book}
            removeBookFromLibrary={removeBookFromLibrary}
          />
        ))}
      </div>
    </div>
  );
};
