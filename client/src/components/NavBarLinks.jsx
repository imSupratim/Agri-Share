import React from "react";
import { Link } from "react-router-dom";

const NavBarLinks = (props) => {
  return (
    <div className="flex gap-2 items-center font-bold rounded-3xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all ease-in-out py-1 px-2 ">
      <Link to={props.route}>{props.name}</Link>
    </div>
  );
};

export default NavBarLinks;
