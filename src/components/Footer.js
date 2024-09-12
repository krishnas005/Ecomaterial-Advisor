"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

const Footer = () => {
  useEffect(() => { 
    const footerLinks = document.querySelectorAll(".footer-link");
    footerLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, { scale: 1.1, duration: 0.3, ease: "power2.out" });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }, []);

  return (
    <footer className="bg-[#0d151c] text-white py-6 mt-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-bold mb-4">Tata Sustainability</h3>
          <p className="text-sm text-gray-400">
            Building a sustainable future through innovation and collaboration.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-start">
            <h4 className="text-md font-semibold mb-3">Quick Links</h4>
            <a className="footer-link text-sm text-gray-300 hover:text-white transition duration-200" href="/">
              Home
            </a>
            <a className="footer-link text-sm text-gray-300 hover:text-white transition duration-200" href="/about-us">
              About Us
            </a>
            <a className="footer-link text-sm text-gray-300 hover:text-white transition duration-200" href="/news">
              News
            </a>
            <a className="footer-link text-sm text-gray-300 hover:text-white transition duration-200" href="/#explore">
              Explore
            </a>
          </div>

          <div className="flex flex-col items-start">
            <h4 className="text-md font-semibold mb-3">Contact Us</h4>
            <p className="text-sm text-gray-300">Email: contact@tatasustainability.com</p>
            <p className="text-sm text-gray-300">Phone: +91 1234567890</p>
            <p className="text-sm text-gray-300">Address: Mohali, India</p>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Tata Sustainability. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
