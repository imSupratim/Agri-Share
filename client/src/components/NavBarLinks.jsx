import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBarLinks = (props) => {
  return (
    <NavLink
      to={props.route}
      onClick={props.onClick}
      className={({ isActive }) =>
        `
    flex  items-center  border-gray-500 rounded-sm hover:scale-105 active:scale-95 transition-all ease-in-out py-1 px-2 
    ${isActive ? "border-b-2 border-green-500" : "hover:bg-gray-200"}

    `
      }
    >
      {props.name}
    </NavLink>
  );
};

export default NavBarLinks;
