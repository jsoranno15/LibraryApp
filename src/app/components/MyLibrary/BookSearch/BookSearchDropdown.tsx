import { BookVolume } from "@/types/BookTypes";
import { Book } from "@/types/UserType";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { PlusIcon } from "@/app/icons";

export const BookSearchDropdown = ({
  books,
  onSelect,
  onClick,
  addBookToLibrary,
  showDropdown,
}: {
  books: BookVolume[];
  onSelect?: (book: BookVolume) => void;
  onClick: () => void;
  addBookToLibrary: (book: Book) => void;
  showDropdown: boolean;
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClick(); // Call onClick to close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClick]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-[46px] max-h-[500px] sm:w-[350px] overflow-y-auto transition-all duraiton-200
         bg-white border rounded-lg shadow-lg mt-2  max-w-fit z-[10]
         ${showDropdown && "rounded-t-none"}
         `}
    >
      {books.length === 0 ? (
        <div className="p-4 text-gray-500 w-[350px] text-center ">
          No results found
        </div>
      ) : (
        <ul className="flex flex-col gap-2 bg-light-grey p-2 ">
          {books.map((book, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer bg-white transition-all duration-100 rounded-xl shadow-md "
              onClick={() => {
                if (onSelect) onSelect(book); // Call onSelect if provided
                onClick(); // Also close the dropdown
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
                });
              }}
            >
              <div className="flex flex-row h-full gap-2 items-center w-full p-2">
                <span className="w-1/6">
                  {book?.volumeInfo?.imageLinks?.smallThumbnail && (
                    <Image
                      src={book?.volumeInfo?.imageLinks?.smallThumbnail}
                      height={800}
                      width={800}
                      alt="Picture of the author"
                      className=" transition-all duration-300 rounded-md max-h-[58px] h-[58px] aspect-auto"
                    ></Image>
                  )}
                </span>
                <div className="flex flex-col w-3/4">
                  <span className="font-semibold truncate">
                    {book?.volumeInfo?.title}
                  </span>
                  <span className="text-gray-500 text-xs truncate">
                    {book?.volumeInfo?.authors}i
                  </span>
                </div>
                {/* <div className="text-white">
                  <div className="size-4 ">
                    <PlusIcon />
                  </div>
                </div> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookSearchDropdown;
