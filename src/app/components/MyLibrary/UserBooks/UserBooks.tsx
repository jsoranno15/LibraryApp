import { useEffect, useState } from "react";
import { auth } from "../../../../firebase/config";
import Image from "next/image";
import { BookCard } from "../../core/BookCard";
import { useCurrentUser, useUserStoreActions } from "@/app/store/userStore";
import Popup from "../../core/Popup";
import { BookInformation } from "./BookInformation";
import { Book } from "@/types/UserType";

export const UserBooks = () => {
  const currentUser = useCurrentUser();
  const { setCurrentUser, removeBookFromCurrentUserLibrary } =
    useUserStoreActions();

  const [isOpen, setIsOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  // console.log("user: ", currentUser);

  // console.log("books: ", currentUser?.library);
  return (
    <div className="flex flex-col gap-5 rounded-xl p-4 bg-ds-dark-purple-100  flex-grow overflow-y-auto">
      <span className="font-semibold  text-md  bg-white w-full rounded-xl p-2 px-4 shadow-md shadow-ds-dark-purple-200 ">
        My Library
      </span>
      <div className="flex flex-row  gap-3 flex-wrap transition-all duration-300  ">
        {currentUser?.library.map((book, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentBook(currentUser?.library[i]);
              setIsOpen(true);
            }}
          >
            <BookCard book={book} />
          </button>
        ))}
        <Popup
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <BookInformation book={currentBook} setIsOpen={setIsOpen} />
        </Popup>
      </div>
    </div>
  );
};
