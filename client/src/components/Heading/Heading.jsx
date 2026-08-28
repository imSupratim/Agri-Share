import React from "react";

const Heading = (props) => {
  return (
    <div className="py-20">
      <div className="w-fit mx-auto text-center">
        <h2 className="font-extrabold text-4xl md:text-5xl">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            {props.highlight}
          </span>{" "}
          {props.heading}
        </h2>
        <div className="w-36 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6 rounded-full shadow-md shadow-blue-200/50"></div>
      </div>
    </div>
  );
};

export default Heading;
  