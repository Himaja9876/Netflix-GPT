import React from "react";

const FullScreenTrailer = ({ trailerKey, onClose }) => {
  if (!trailerKey) return null; // Do not render if no trailerKey is available

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-50">
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1`}
        title="Fullscreen Video"
        allow="autoplay; fullscreen; encrypted-media; accelerometer; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: "none" }}
      />
      <button
        onClick={onClose}
        className="absolute top-4 text-white text-2xl bg-transparent hover:text-gray-400"
        style={{ right: "0.5rem" }} // Adjust value as needed
      >
        &times;
      </button>
    </div>
  );
};

export default FullScreenTrailer;
