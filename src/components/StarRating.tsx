import React, { useEffect, useState } from "react";
import Star from "public/star.svg";

const StarRating = ({ rating, handleClick }: any) => {
  const [hoverRating, setHoverRating] = useState(-1);

  const onEnterStar = (index: number) => {
    setHoverRating(index + 1);
  };

  const onLeaveRating = () => {
    setHoverRating(-1);
  };

  return (
    <div className="flex p-2" onMouseLeave={() => onLeaveRating()}>
      {[...Array(5)].map((_, index) => {
        if (hoverRating > -1) {
          if (index < hoverRating) {
            return (
              <Star
                key={index}
                onMouseEnter={() => onEnterStar(index)}
                onClick={() => handleClick(index + 1)}
                fill="#FFD700"
                className=" cursor-pointer duration-300 ease-in-out hover:scale-125"
              />
            );
          } else {
            return (
              <Star
                key={index}
                onMouseEnter={() => onEnterStar(index)}
                onClick={() => handleClick(index + 1)}
                fill="#444444"
                className="cursor-pointer duration-300 ease-in-out hover:scale-125"
              />
            );
          }
        }
        if (index < rating) {
          return (
            <Star
              key={index}
              onMouseEnter={() => onEnterStar(index)}
              onClick={() => handleClick(index + 1)}
              fill="#FFD700"
              className="cursor-pointer duration-300 ease-in-out hover:scale-125"
            />
          );
        } else {
          return (
            <Star
              key={index}
              onMouseEnter={() => onEnterStar(index)}
              onClick={() => handleClick(index + 1)}
              fill="#444444"
              className="cursor-pointer duration-300 ease-in-out hover:scale-125"
            />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
