import { useCurrentUser, useUserStoreActions } from "@/app/store/userStore";
import { VolumeInfo } from "@/types/BookTypes";
import { Book } from "@/types/UserType";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReadMore from "./ReadMore";
import { LoadingSpinner } from "@/app/icons";

export const BookInformation = ({
  book,
  setIsOpen,
}: {
  book: Book | null;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [bookInfo, setBookInfo] = useState<VolumeInfo | null>(null);
  const currentUser = useCurrentUser();
  const {
    removeBookFromCurrentUserLibrary,
    setBookAsFavorite,
    getFavoriteCount,
    toggleCurrentUserBookCompletion,
  } = useUserStoreActions();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const removeBookFromLibrary = async (bookId: string) => {
    setIsOpen(false);
    if (currentUser) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user/book`,
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

  const toggleFavoriteBook = async (bookId: string) => {
    if (currentUser) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user/book/updateFavorite`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid: currentUser.uid,
              bookId: bookId,
              favorite: !isFavorite,
            }),
          }
        );
      } catch (error) {
        console.error("Failed to update favorite status:", error);
        // setError("Failed to update favorite status.");
      }
    }
  };

  async function toggleBookCompletion(bookId: string) {
    if (currentUser) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user/book/updateCompleted`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: currentUser.uid, bookId }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.error}`);
        }

        const result = await response.json();
        console.log(result.message); // Success message
        toggleCurrentUserBookCompletion(bookId);
      } catch (error) {
        console.error("Failed to update book completion status:", error);
      }
    }
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        ` https://www.googleapis.com/books/v1/volumes/${book?.bookId}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      )
      .then((res) => {
        setBookInfo(res.data.volumeInfo);
      })
      .catch((err) => console.log("error", err));
    setIsLoading(false);
  }, [book?.bookId]);

  if (!bookInfo) {
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-hidden ">
      <div className="flex flex-col h-full gap-4 pb-8">
        <div className="flex flex-row gap-3">
          <div className="relative rounded-lg h-[300px] items-center flex justify-center w-[197px] aspect-auto shadow-lg">
            {bookInfo && (
              <Image
                src={
                  bookInfo?.imageLinks?.extraLarge ||
                  bookInfo?.imageLinks?.large ||
                  bookInfo?.imageLinks?.medium ||
                  bookInfo?.imageLinks?.small ||
                  bookInfo?.imageLinks?.thumbnail ||
                  bookInfo?.imageLinks?.smallThumbnail ||
                  ""
                }
                height={1200}
                width={1200}
                alt="image"
                className="object-cover h-full rounded-lg w-fit "
              ></Image>
            )}
          </div>

          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col">
              <div className="text-lg font-bold">{bookInfo?.title}</div>
              <div>{book?.authors}</div>
              <div>Page Count: {book?.progress?.totalPages}</div>
            </div>
            <div className="w-[170px] gap-2 flex flex-col ">
              <button
                className=" bg-ds-green-400  flex w-full justify-center
                  transition-all duration-150
                  items-center text-white rounded-md px-2 py-1  "
                onClick={() => toggleBookCompletion(book?.bookId || "")}
              >
                Mark as Completed
              </button>
              <button
                disabled={getFavoriteCount() >= 3 && !book?.favorite}
                className="bg-ds-yellow-400 text-white rounded-md py-1 px-2 w-full disabled:bg-gray-300"
                onClick={() => {
                  toggleFavoriteBook(book?.bookId || "");
                  setBookAsFavorite(book?.bookId || "");
                  setIsOpen(false);
                }}
              >
                {!book?.favorite ? "Add to Favorites" : "Remove from Favorites"}
              </button>
              <div className="">
                <button
                  className=" bg-ds-red-400 hover:bg-ds-red-600 flex w-full justify-center
                  transition-all duration-150
                  items-center text-white rounded-md px-2 py-1  "
                  onClick={() => removeBookFromLibrary(book?.bookId || "")}
                >
                  Remove from Library
                </button>
              </div>
            </div>
          </div>
        </div>

        <ReadMore text={bookInfo?.description || ""} />
      </div>

      <div></div>
    </div>
  );
};
