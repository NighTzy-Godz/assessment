"use client";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import React from "react";

function Navbar() {
  const { user, logout } = useAuth();

  const renderButtons = () => {
    if (!user) {
      return (
        <React.Fragment>
          <Link
            href="/auth/login"
            className="md:text-lg md:px-5 px-3 py-2 bg-mainColor rounded-3xl text-bgColor hover:bg-mainColorDark "
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="md:text-lg md:px-5 px-3 py-2 rounded-3xl bg-textColor text-bgColor hover:bg-textColorDark"
          >
            Register
          </Link>
        </React.Fragment>
      );
    }
    return (
      <div className="flex items-center  gap-3">
        <Link
          href="/addItem"
          className=" md:text-base text-sm md:px-5  px-3 py-2 bg-textColor rounded-3xl text-bgColor hover:bg-textColorDark "
        >
          Add Item
        </Link>
        <button
          onClick={logout}
          className="md:text-lg md:px-5 px-3 py-2 bg-mainColor rounded-3xl text-bgColor hover:bg-mainColorDark "
        >
          Logout
        </button>
      </div>
    );
  };
  return (
    <nav className="py-5 bg-bgColor shadow-xl">
      <div className="container items-center mx-auto flex justify-between">
        <Link
          href="/"
          className="md:text-3xl text-2xl  text-mainColor font-extrabold"
        >
          Shopmefy
        </Link>

        <div className=" flex items-center gap-3">{renderButtons()}</div>
      </div>
    </nav>
  );
}

export default Navbar;
