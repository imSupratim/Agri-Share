import React from "react";
import { DoorClosed, Tractor, LogOut, LogIn, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";
import NavBarLinks from "./NavBarLinks.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("user");
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div>
      <div className="bg-gray-300 flex justify-between items-center py-2 px-10">
        <div>
          <div className="flex gap-2 items-center">
            <div className="bg-green-400 rounded-full p-2">
              <Tractor />
            </div>
            <h1 className="font-bold text-green-700">Agri-Share</h1>
          </div>
        </div>

        <div>
          {user && (
            <NavBarLinks route="/" name="Home" />
          )}
        </div>

        <div>
          {!user ? (
            <div className="flex gap-2 items-center text-sm">
              <Link
                to="/login"
                className="bg-green-500 flex gap-1 items-center px-3 py-1 hover:rounded-2xl transition-all ease-in-out"
              >
                 <LogIn className="size-5"/> Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 flex gap-1 items-center px-3 py-1 hover:rounded-2xl transition-all ease-in-out"
              >
                <UserPlus className="size-5"/> Register
              </Link>
            </div>
          ) : (
            <div
              onClick={handleLogout}
              className="bg-red-600  px-3 py-1 hover:rounded-2xl transition-all ease-in-out"
            >
              <button className="flex gap-1 hover:cursor-pointer items-center text-white"> <LogOut className="size-5"/> Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
