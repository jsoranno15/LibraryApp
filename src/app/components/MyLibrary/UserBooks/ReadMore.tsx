import { useState } from "react";

interface ReadMoreProps {
  text: string;
  maxLength?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength = 299 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const isTextLong = text.length > maxLength;
  const displayText = isExpanded ? text : `${text.slice(0, maxLength)}...`;

  return (
    <div
      className="relative pb-10 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "h-auto" : `h-[${maxLength}px] overflow-hidden`
        }`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: displayText || "No description avaiable",
          }}
        />
      </p>
      {isTextLong && (
        <button
          onClick={handleToggle}
          className={`absolute bottom-5 left-0 text-ds-dark-purple-400  hover:text-ds-light-purple-500 `}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
