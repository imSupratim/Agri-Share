import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return <div className="bg-green-700">
    <div className="flex justify-between">
      <div>Agri-Share</div>

      <div className="flex flex-col gap-2">
        <Link to="/listitems">List Items</Link>
      </div>

      <div>Agri-Share</div>
    </div>
  </div>;
};

export default Footer;
