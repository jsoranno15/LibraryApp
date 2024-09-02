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
    <div className="px-4 w-full">
      <div
        className="flex items-center text-center rounded-xl flew-row 
      bg-light-grey p-4 min-h-[120px]"
      >
        <div className="w-full font-normal flex-flex-col">
          <div className="font-semibold">{quote?.quote}</div>
          <div className="font-normal">- {quote?.author}</div>
        </div>
        {/* <button onClick={() => getBookQuote()} className="">
          refetch
        </button> */}
      </div>
    </div>
  );
};
