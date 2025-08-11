import React from "react";

type CardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
};

const Card: React.FC<CardProps> = ({ title, description, imageUrl, url }) => {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden border p-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded"
        />
      )}
      <h2 className="text-lg font-bold text-gray-800 mt-2">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Read More
        </a>
      )}
    </div>
  );
};

export default Card;
