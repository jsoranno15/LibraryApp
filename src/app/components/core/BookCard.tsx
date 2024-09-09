import { CompletedIcon, StarIcon } from "@/app/icons";
import { Book } from "@/types/UserType";
import Image from "next/image";

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <div
      className="flex flex-col w-[120px] bg-white p-2 rounded-xl gap-3 justify-between shadow-md shadow-ds-dark-purple-200 
    hover:scale-110 transition-all duration-200"
    >
      <span className="relative bg-gray-200 rounded-lg aspect-auto h-[120px]">
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
      <div className="flex flex-col h-[1/6] items-start overflow-hidden ">
        <span className="truncate font-bold ">{book?.title}</span>
        <span className="truncate text-sm">{book?.authors}</span>
        <div className=" h-5 flex flex-row gap-1">
          {book?.favorite && (
            <div className="size-5 text-ds-yellow-400">
              <StarIcon />
            </div>
          )}
          {book?.progress?.completed && (
            <div className="size-5 text-ds-green-400">
              <CompletedIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
