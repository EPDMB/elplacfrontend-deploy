import React from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const filledStars = Math.round(rating);
  const emptyStars = maxRating - filledStars;

  return (
    <div className="flex">
      {Array.from({ length: filledStars }, (_, i) => (
        <span key={`filled-${i}`} className="text-yellow-500">
          ★
        </span>
      ))}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">
          ☆
        </span>
      ))}
    </div>
  );
};

export default StarRating;
