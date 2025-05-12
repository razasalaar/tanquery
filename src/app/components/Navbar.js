"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (!result.success) {
      console.warn("Logout API failed:", result.message);
      alert(result.message);
    }

    router.push("/login");
  };

  return (
    <header className="shadow-lg rounded-lg  w-full">
      <nav className="flex h-auto w-auto justify-between items-center md:h-16 px-4">
        {/* Logo */}
        <div
          className={`w-1/2 md:w-1/5 font-semibold ${
            menuOpen ? "hidden md:flex md:justify-center" : "flex items-center"
          }`}
        >
          <Link
            className="text-red-700 font-bold text-2xl md:text-4xl"
            href="/dashboard"
          >
            ONE
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex w-2/6 justify-evenly font-semibold">
          <Link href="/dashboard">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex w-1/5 justify-evenly font-semibold">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-gray-500 w-10 h-10 relative focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                menuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                menuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
