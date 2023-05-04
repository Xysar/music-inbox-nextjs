import React, { useEffect, useState } from "react";
import Star from "public/star.svg";

const StarRating = ({ rating, handleClick }: any) => {
  const [hoverRating, setHoverRating] = useState(-1);

  const onEnterStar = (event: Event, index: number) => {
    setHoverRating(index + 1);
  };

  const onLeaveStar = (event: Event, index: number) => {};

  const onEnterRating = (event: React.MouseEvent) => {};

  const onLeaveRating = (event: React.MouseEvent) => {
    setHoverRating(-1);
  };
  return (
    <div
      className="flex p-2"
      onMouseEnter={(e) => onEnterRating(e)}
      onMouseLeave={(e) => onLeaveRating(e)}
    >
      {[...Array(5)].map((_, index) => {
        if (hoverRating > -1) {
          if (index < hoverRating) {
            return (
              <Star
                key={index}
                onMouseEnter={(e: any) => onEnterStar(e, index)}
                onMouseLeave={(e: any) => onLeaveStar(e, index)}
                onClick={() => handleClick(index + 1)}
                fill="#FFD700"
                className=" cursor-pointer hover:scale-125 duration-300 ease-in-out"
              />
            );
          } else {
            return (
              <Star
                key={index}
                onMouseEnter={(e: any) => onEnterStar(e, index)}
                onMouseLeave={(e: any) => onLeaveStar(e, index)}
                onClick={() => handleClick(index + 1)}
                fill="#444444"
                className="cursor-pointer hover:scale-125 duration-300 ease-in-out"
              />
            );
          }
        }
        if (index < rating) {
          return (
            <Star
              key={index}
              onMouseEnter={(e: any) => onEnterStar(e, index)}
              onMouseLeave={(e: any) => onLeaveStar(e, index)}
              fill="#FFD700"
              className="cursor-pointer hover:scale-125 duration-300 ease-in-out"
            />
          );
        } else {
          return (
            <Star
              key={index}
              onMouseEnter={(e: any) => onEnterStar(e, index)}
              onMouseLeave={(e: any) => onLeaveStar(e, index)}
              fill="#444444"
              className="cursor-pointer hover:scale-125 duration-300 ease-in-out"
            />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
