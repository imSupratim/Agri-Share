import React from "react";
import { Link } from "react-router-dom";
import sappling from "../assets/sappling.png";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-linear-to-b from-yellow-100 to-yellow-300 flex px-30 py-5 justify-between items-center">
      <div className=" flex flex-col gap-3 px-5">
        <Link
          to="/"
          className="flex gap-2 items-center hover:scale-105 active:scale-95 transition-all ease-in-out"
        >
          <div className="bg-green-400 rounded-full p-1">
            <img
              src={sappling}
              alt="Agri-Share"
              className="size-9 rounded-full"
            />
          </div>

          <h1 className="font-bold text-green-700 text-lg">Agri-Share</h1>
        </Link>

        <div className="flex items-center justify-left gap-5 mt-1">
          <FaInstagram className="size-7" />
          <FaFacebook className="size-7" />
          <FaLinkedin className="size-7" />
          <FaXTwitter className="size-7" />
        </div>

        <div className="mt-1">
          <div className="flex gap-1 items-center">
            <FaRegCopyright />{" "}
            <span>Agri-Share Marketplace Private Limited</span>
          </div>
        </div>
      </div>

      <div className=" pt-7 flex flex-col gap-4 text-lg">
        <Link
          className="hover:scale-105 hover:font-semibold transition-all ease-in-out"
          to="/"
        >
          Home
        </Link>
        <Link
          className="hover:scale-105 hover:font-semibold transition-all ease-in-out"
          to="/equipment"
        >
          Marketplace
        </Link>
        <Link
          className="hover:scale-105 hover:font-semibold transition-all ease-in-out"
          to="/my-equipment"
        >
          My Machinery
        </Link>
        <Link
          className="hover:scale-105 hover:font-semibold transition-all ease-in-out"
          to="/add-equipment"
        >
          Add Machinery
        </Link>
        <Link
          className="hover:scale-105 hover:font-semibold transition-all ease-in-out"
          to="/my-bookings"
        >
          My Bookings
        </Link>
        <Link
          className="hover:scale-105 hover:font-semibold transition-all ease-in-out"
          to="/rental-requests"
        >
          New Requests
        </Link>
      </div>
      <div className="flex  flex-col gap-4 text-lg">
        <span className="hover:scale-105 hover:font-semibold transition-all ease-in-out">
          Privacy Policy
        </span>
        <span className="hover:scale-105 hover:font-semibold transition-all ease-in-out">
          Terms of use
        </span>
        <span className="hover:scale-105 hover:font-semibold transition-all ease-in-out">
          Rent on Agri-Share
        </span>
        <span className="hover:scale-105 hover:font-semibold transition-all ease-in-out">
          Investor Relation
        </span>
      </div>
      <div className="pt-7 flex flex-col gap-4 ">
        <div className="border-1 border-amber-500 p-3 text-center text-lg rounded-2xl bg-linear-to-br from-amber-200 to-amber-400">
            <span className="text-orange-700  font-bold">Thank You</span>
        </div>
        <div className="border-1 border-amber-500 p-3 text-center text-sm rounded-2xl bg-linear-to-br from-amber-200 to-amber-400">
            <span className="text-orange-700  font-bold">Made with 💗 by Supratim Mandal</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
