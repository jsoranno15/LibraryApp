import { LoadingSpinner } from "@/app/icons";
import { Quote } from "@/types/Quotes";
import axios from "axios";
import { useEffect, useState } from "react";

export const BookQuote = () => {
  const [quote, setQuote] = useState<Quote>();

  const getBookQuote = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_RANDOM_QUOTE}`)
      .then((res) => {
        console.log("success", res.data);
        setQuote(res.data);
      })
      .catch((err) => console.log("error", err));
  };

  useEffect(() => {
    getBookQuote();
  }, []);

  return (
    <div className=" w-full bg-ds-pink-100 rounded-xl p-2">
      <div
        className="flex items-center shadow-md shadow-ds-pink-200 bg-white text-center rounded-xl flex-row 
       p-4 min-h-[120px]"
      >
        {quote ? (
          <div className="w-full font-normal flex-flex-col">
            <div className="font-semibold">{quote?.quote}</div>
            <div className="font-normal">- {quote?.author}</div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center ">
            <LoadingSpinner />
          </div>
        )}
        {/* <button onClick={() => getBookQuote()} className="">
          refetch
        </button> */}
      </div>
    </div>
  );
};
