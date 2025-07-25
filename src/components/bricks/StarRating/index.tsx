import { Star } from "lucide-react";

export interface StarRatingProps {
  rating: number;
  showCount?: boolean;
  count?: number;
  className?: string;
}

export const StarRating = ({
  rating,
  showCount = false,
  count,
  className = "",
}: StarRatingProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
          aria-hidden="true"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-4 w-4 fill-yellow-400/50 text-yellow-400"
          aria-hidden="true"
        />,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="h-4 w-4 text-gray-300"
          aria-hidden="true"
        />,
      );
    }

    return stars;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="flex items-center"
        aria-label={`Rating: ${rating} out of 5 stars`}
      >
        {renderStars(rating)}
      </div>
      {showCount && count !== undefined && (
        <span className="text-sm text-gray-500">({count} reviews)</span>
      )}
    </div>
  );
};
