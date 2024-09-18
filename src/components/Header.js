"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import './buttons.css';
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to(".sidebar", { x: 0, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(".sidebar", { x: "100%", duration: 0.5, ease: "power2.in" });
    }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, { scale: 1.1, duration: 0.3, ease: "power2.out" });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }, [isSidebarOpen]);

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-solid border-b-[#e7eef4] md:px-10">
      <div className="flex items-center gap-2 text-[#0d151c]">
        <div className="w-8 h-8">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          EcoMaterial Advisor
        </h2>
      </div>

      <nav className="hidden md:flex flex-1 justify-end gap-8 items-center">
        <a className="nav-link bt text-[#0d151c] text-sm font-medium" href="/">
          Home
        </a>
        <a
          className="nav-link bt text-[#0d151c] text-sm font-medium"
          href="/about-us"
        >
          About Us
        </a>
        <a className="nav-link bt text-[#0d151c] text-sm font-medium" href="/news">
          News
        </a>
        <a
          className="nav-link bt text-[#0d151c] text-sm font-medium"
          href="/#explore"
        >
          Explore
        </a>
        <a className="nav-link bt text-[#0d151c] text-sm font-medium" href="/login">
          Login
        </a>
      </nav>

      <div className="md:hidden flex items-center text-black">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center justify-center p-2 rounded-md focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="sidebar fixed top-0 right-0 w-64 h-full text-black bg-white shadow-lg transform translate-x-full z-10">
        <div className="p-4 flex flex-col">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="self-end p-2 rounded-md focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="mt-6 flex flex-col gap-4">
            <a className="nav-link text-[#0d151c] text-sm font-medium" href="/">
              Home
            </a>
            <a className="nav-link text-[#0d151c] text-sm font-medium" href="/about-us">
              About Us
            </a>
            <a
              className="nav-link text-[#0d151c] text-sm font-medium"
              href="/news"
            >
              News
            </a>
            <a
              className="nav-link text-[#0d151c] text-sm font-medium"
              href="/#explore"
            >
              Explore
            </a>
            <a
              className="nav-link text-[#0d151c] text-sm font-medium"
              href="/login"
            >
              Login
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
