import React, { useEffect, useRef, useState } from "react";
import LoginDesign from "../components/LoginDesign";
import RegisterDesign from "../components/RegisterDesign.jsx"
import toast from "react-hot-toast";
import api from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Sprout } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(imageRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Registration Successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-10 md:mt-15">
        <div ref={titleRef} className="mb-8">
          <h1 className="text-4xl flex gap-2 items-center justify-center font-bold text-green-700">
            Register{" "}
            <div className="bg-yellow-400 rounded-full p-2 ">
              <Sprout className="size-10" />
            </div>
          </h1>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:rounded-4xl font-semibold hover:bg-green-700 transition-all ease-in-out hover:cursor-pointer active:scale-95"
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>

      <div
        ref={imageRef}
        className="hidden md:flex flex-1 justify-center items-center mt-10"
      >
        <RegisterDesign />
      </div>
    </div>
  );
};

export default Login;
