import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="font-sans tracking-wide mt-12   pt-12 pb-6">
    <div className="flex flex-wrap justify-between gap-10">
      <div className="max-w-md">
        <NavLink to="/" className="">
             <span className="text-[1rem] sm:text-2xl  text-gray-700 font-bold" >Foodie🍔</span>
          </NavLink>
        <div className="mt-6">
          <p className="text-gray-600 font-[500] leading-relaxed text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
      <div className="max-lg:min-w-[140px]">
        <h4 className="text-black font-bold text-base relative max-sm:cursor-pointer">
          COMPANY
        </h4>
        <ul className="mt-6 space-y-1">
          <li>
            <NavLink to="/"
              className="hover:text-gray-800 font-[500] text-gray-600 text-sm"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to=''
              className="hover:text-gray-800 font-[500] text-gray-600 text-sm"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink to=''
              className="hover:text-gray-800 font-[500] text-gray-600 text-sm"
            >
              Delivery
            </NavLink>
          </li>
          <li>
            <NavLink to=''
              className="hover:text-gray-800 font-[500] text-gray-600 text-sm"
            >
              privacy policy
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="max-lg:min-w-[140px]">
        <h4 className="text-black font-bold text-base relative max-sm:cursor-pointer">
          GET IN TOUCH
        </h4>
        <ul className="mt-6 space-y-1">
          <li>
            <NavLink to="/"
              className="hover:text-gray-800 font-[500] text-gray-600 text-sm"
            >
              +91 123456789
            </NavLink>
          </li>
          <li>
            <NavLink to=''
              className="hover:text-gray-800 font-[500] text-gray-600 text-sm"
            >
              Nikhilrajput060@gmail.com
            </NavLink>
          </li>
        </ul>
      </div>
      
    </div>
    <hr className="mt-10 mb-6 border-gray-300" />
    <div className="text-center">
      <p className="text-gray-600 font-[500] text-sm md:ml-auto">
        © Foodie🍔 . Made By 💘 Nikhil Rana
      </p>
    </div>
  </footer>
  );
}

export default Footer;
