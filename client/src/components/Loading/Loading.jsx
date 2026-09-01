import React from "react";

const Loading = (props) => {
  return (
    <div className="min-h-screen flex items-center bg-linear-to-b from-green-50  to-yellow-200 gap-6 justify-center">
      <div>
        <div className="size-10 rounded-full border-b-4 animate-spin"></div>
      </div>
      <p className="text-gray-500">Loading {props.pageName}</p>
    </div>
  );
};

export default Loading;
