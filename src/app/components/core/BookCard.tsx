import { Book } from "@/types/UserType";
import Image from "next/image";

export const BookCard = ({
  book,
  removeBookFromLibrary,
}: {
  book: Book;
  removeBookFromLibrary?: any;
}) => {
  return (
    <div
      className="flex flex-col w-[120px] bg-white p-2 rounded-xl gap-3 justify-between shadow-md shadow-ds-dark-purple-200 
    hover:scale-110 transition-all duration-200"
    >
      <span className="relative bg-gray-200 rounded-lg aspect-auto h-[120px]">
        {removeBookFromLibrary && (
          <button
            className="absolute bg-red-500 flex justify-center items-center  rounded-lg  right-0 size-5"
            onClick={() => removeBookFromLibrary(book.bookId)}
          >
            &#x2715;
          </button>
        )}
        {book.image && (
          <Image
            src={book.image}
            height={800}
            width={800}
            alt="Picture of the author"
            className="object-cover h-full rounded-lg  w-full "
          ></Image>
        )}
      </span>
      <div className="flex flex-col h-[1/6]">
        <span className="truncate font-bold">{book?.title}</span>
        <span className="truncate text-sm">{book?.authors}</span>
      </div>
    </div>
  );
};
