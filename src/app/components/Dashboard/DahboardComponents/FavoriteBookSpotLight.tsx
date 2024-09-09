import { useCurrentUser, useUserStoreActions } from "@/app/store/userStore";
import { BookCard } from "../../core/BookCard";
import { useRouter } from "next/router";
import { PlusIcon } from "@/app/icons";

export const FavoriteBookSpotlight = () => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { getFavoriteCount } = useUserStoreActions();
  return (
    <div className="flex flex-col gap-5 rounded-xl p-4 bg-ds-dark-purple-100  w-fit g-full min-w-[424px] min-h-[298px]">
      <span className="font-semibold flex gap-2 text-md  bg-white w-fit rounded-xl p-2 px-4 shadow-md shadow-ds-dark-purple-200 ">
        My Favorite Books
        <span>{getFavoriteCount()}/3</span>
      </span>
      {getFavoriteCount() >= 1 ? (
        <div className="flex gap-4">
          {currentUser?.library.map((book, i) => {
            if (book.favorite)
              return (
                <button
                  key={i}
                  onClick={() => {
                    router.push("/MyLibrary");
                  }}
                >
                  <BookCard book={book} />
                </button>
              );
          })}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <button
            onClick={() => {
              router.push("/MyLibrary");
            }}
            className="bg-ds-dark-purple-400 w-fit -translate-y-[25px] text-white rounded-md py-1 px-3 flex gap-1 hover:bg-ds-dark-purple-500
          transition-all duration-all"
          >
            Add favorite from Library
            <span className="flex size-5">
              <PlusIcon />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
