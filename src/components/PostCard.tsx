import React, { useState } from "react";
import { BsImage } from "react-icons/bs";

interface PostCardProps {
  imageUrl?: string;
  date: string;
  title: string;
}

const PostCard: React.FC<PostCardProps> = ({ imageUrl, date, title }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="bg-white w-full rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="w-full aspect-video bg-primary/40 relative overflow-hidden">
        {imageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              onLoad={() => setImageLoading(false)}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500 space-y-2">
              <BsImage className="w-12 h-12 mx-auto" size={48} />
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-sm mb-2">{date}</p>
        <h3 className="font-bold text-xl leading-tight line-clamp-3">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default PostCard;
