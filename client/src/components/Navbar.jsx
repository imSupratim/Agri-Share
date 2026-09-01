// import React, { useEffect } from "react";
// import {
//   DoorClosed,
//   Tractor,
//   LogOut,
//   LogIn,
//   UserPlus,
//   User,
//   Divide,
//   Menu,
//   X,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../services/api.js";
// import toast from "react-hot-toast";
// import NavBarLinks from "./NavBarLinks.jsx";
// import sappling from "../assets/sappling.png";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = async () => {
//     await api.post("/auth/logout");
//     localStorage.removeItem("user");
//     toast.success("Logged out");
//     navigate("/login");
//   };

//   return (
//     <div>
//       <div className="bg-gray-300 flex justify-between items-center py-2 px-10">
//         <div>
//           <Link
//             to="/"
//             className="flex gap-2 items-center hover:scale-105 active:scale-96 transition-all ease-in-out"
//           >
//             <div className="bg-green-400 rounded-full p-1">
//               <img
//                 src={sappling}
//                 alt="sappling"
//                 className="size-9 rounded-full"
//               />
//             </div>
//             <h1 className="font-bold text-green-700">Agri-Share</h1>
//           </Link>
//         </div>

//         <div>
//           {user && (
//             <div className="flex gap-5">
//               <NavBarLinks route="/" name="Home" />
//               <NavBarLinks route="/equipment" name="Marketplace" />
//               <NavBarLinks route="/my-equipment" name="My Machinery" />
//               <NavBarLinks route="/add-equipment" name="Add Machinery" />
//               <NavBarLinks route="/my-bookings" name="My Bookings"/>
//               <NavBarLinks route="/rental-requests" name="New Requests"/>
//             </div>
//           )}
//         </div>

//         <div>
//           {!user ? (
//             <div className="flex gap-2 items-center text-sm">
//               <Link
//                 to="/login"
//                 className="bg-green-500 flex gap-1 items-center px-3 py-1 hover:rounded-2xl transition-all ease-in-out"
//               >
//                 <LogIn className="size-5" /> Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-blue-500 flex gap-1 items-center px-3 py-1 hover:rounded-2xl transition-all ease-in-out"
//               >
//                 <UserPlus className="size-5" /> Register
//               </Link>
//             </div>
//           ) : (
//             <div className="flex gap-4 items-center">
//               <Link
//                 to="/profile"
//                 className="flex gap-1 hover:cursor-pointer hover:scale-105 hover:shadow-2xl active:scale-95 items-center bg-blue-600  px-3 py-1  rounded-2xl transition-all ease-in-out text-white"
//               >
//                 {" "}
//                 <User className="size-5" /> Profile
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="flex gap-1 hover:cursor-pointer hover:scale-105 hover:shadow-2xl active:scale-95 items-center bg-red-600  px-3 py-1 rounded-2xl transition-all ease-in-out text-white"
//               >
//                 {" "}
//                 <LogOut className="size-5" /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { LogOut, LogIn, UserPlus, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";
import NavBarLinks from "./NavBarLinks.jsx";
import sappling from "../assets/sappling.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      localStorage.removeItem("user");
      toast.success("Logged out");

      setIsMenuOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-300 shadow-md relative z-50">
      <div className="flex justify-between items-center py-2 px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
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

        {/* Desktop Navigation */}
        {user && (
          <div className="hidden lg:flex gap-5 items-center">
            <NavBarLinks route="/" name="Home" />
            <NavBarLinks route="/equipment" name="Marketplace" />
            <NavBarLinks route="/my-equipment" name="My Machinery" />
            <NavBarLinks route="/add-equipment" name="Add Machinery" />
            <NavBarLinks route="/my-bookings" name="My Bookings" />
            <NavBarLinks route="/rental-requests" name="New Requests" />
          </div>
        )}

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:block">
          {!user ? (
            <div className="flex gap-2 items-center text-sm">
              <Link
                to="/login"
                className="bg-green-500 flex gap-1 items-center px-3 py-1 hover:rounded-2xl transition-all"
              >
                <LogIn className="size-5" />
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-500 flex gap-1 items-center px-3 py-1 hover:rounded-2xl transition-all"
              >
                <UserPlus className="size-5" />
                Register
              </Link>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                to="/profile"
                className="flex gap-1 items-center bg-blue-600 px-3 py-1 rounded-2xl text-white hover:scale-105 transition-all"
              >
                <User className="size-5" />
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="flex gap-1 items-center bg-red-600 px-3 py-1 rounded-2xl text-white hover:scale-105 transition-all"
              >
                <LogOut className="size-5" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-400 transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-200 border-t border-gray-400 px-5 py-4">
          {/* Navigation Links */}
          {user ? (
            <>
              <div className="flex flex-col gap-2">
                <NavBarLinks route="/" name="Home" onClick={closeMenu} />

                <NavBarLinks
                  route="/equipment"
                  name="Marketplace"
                  onClick={closeMenu}
                />

                <NavBarLinks
                  route="/my-equipment"
                  name="My Machinery"
                  onClick={closeMenu}
                />

                <NavBarLinks
                  route="/add-equipment"
                  name="Add Machinery"
                  onClick={closeMenu}
                />

                <NavBarLinks
                  route="/my-bookings"
                  name="My Bookings"
                  onClick={closeMenu}
                />

                <NavBarLinks
                  route="/rental-requests"
                  name="New Requests"
                  onClick={closeMenu}
                />
              </div>

              {/* Mobile User Actions */}
              <div className="border-t border-gray-400 mt-4 pt-4 flex flex-col gap-2">
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex gap-2 items-center justify-center bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-700 "
                >
                  <User className="size-5" />
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex gap-2 items-center cursor-pointer justify-center bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white"
                >
                  <LogOut className="size-5" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            /* Mobile Auth */
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                onClick={closeMenu}
                className="bg-green-500 flex gap-2 items-center justify-center px-4 py-2 rounded-xl"
              >
                <LogIn className="size-5" />
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="bg-blue-500 flex gap-2 items-center justify-center px-4 py-2 rounded-xl text-white"
              >
                <UserPlus className="size-5" />
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
