import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import Image from "next/image";
interface Book {
  _id: string;
  title: string;
  author: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export const UserBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
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
        setBooks(data?.library);
      } catch (error) {
        // setError(error instanceof Error ? error.message : "Unknown error");
        // setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  console.log("books: ", books);
  return (
    <div>
      Here are the books:
      <div className="flex flex-row gap-5">
        {books.map((book, i) => (
          <div key={i} className="flex flex-col">
            <span>
              {book.image && (
                <Image
                  src={book.image}
                  height={800}
                  width={800}
                  alt="Picture of the author"
                  className=" object-cover  h-fit w-fit "
                ></Image>
              )}
            </span>
            <span>{book?.title}</span>
            {book?.author}
          </div>
        ))}
      </div>
    </div>
  );
};
