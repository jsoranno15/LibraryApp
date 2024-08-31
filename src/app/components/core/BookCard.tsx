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
    <div className="flex flex-col w-[120px]">
      <span className="relative h-[170px] w-[120px] bg-gray-200 rounded-lg aspect-auto">
        {removeBookFromLibrary && (
          <button
            className="absolute bg-red-500 flex justify-center items-center rounded-sm right-0 size-4"
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
      <span className="truncate font-bold">{book?.title}</span>
      <span className="truncate text-sm">{book?.authors}</span>
    </div>
  );
};
