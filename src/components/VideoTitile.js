import React from "react";

const VideoTitle = ({ title, description }) => {
  return (
    <div className="absolute z-5 w-screen aspect-video z-10 pt-[45%] md:pt-[18%] px-6 md:px-24 text-white ">
      <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-base w-5/12">
        {description}
      </p>
      <div className="my-4 md:m-0">
        <button className=" bg-white text-black py-1 md:py-2.5 px-3 md:px-10 text-xl rounded-md hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white py-1 md:py-2.5 px-3 md:px-6 text-xl rounded-md hover:bg-opacity-80">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
