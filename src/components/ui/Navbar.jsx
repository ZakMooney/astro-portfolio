import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useInitialAnimation } from "@/hooks/useInitialAnimation";

import NavButton from "./NavButton";

import "./Navbar.css";

export default function Navbar({}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const shouldAnimate = useInitialAnimation("nav");

  const handleMouseMove = (e) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // close outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden"
        initial={
          shouldAnimate
            ? {
                y: -60,
              }
            : false
        }
        animate={
          shouldAnimate
            ? {
                y: 0,
              }
            : false
        }
        transition={
          shouldAnimate
            ? {
                duration: 0.6,
                ease: "easeOut",
              }
            : false
        }
      >
        <div
          className={`hover-scanlines pointer-events-none ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            maskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, 
            black 0%,
            rgba(0,0,0,0.5) 50%,
            transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, 
            black 0%,
            rgba(0,0,0,0.5) 50%,
            transparent 100%)`,
          }}
        />

        {/* desktop */}
        <div className="hidden md:flex max-w-screen-xl flex-wrap items-center justify-center mx-auto p-2 gap-2 sm:gap-4 md:gap-8">
          <NavButton href="/" exact index={0}>
            About
          </NavButton>
          <NavButton href="/experience" index={1}>
            Experience
          </NavButton>
          <a href="/" className="flex items-center">
            <img
              src="/mooney-w.svg"
              className="h-12 md:h-18 drop-shadow-sm drop-shadow-blue-100/50"
              alt="Zak Mooney Logo"
            />
          </a>
          <NavButton href="/portfolio" index={2}>
            Portfolio
          </NavButton>
          <NavButton href="/contact" index={3}>
            Contact
          </NavButton>
        </div>

        {/* mobile */}
        <div className="md:hidden flex items-center justify-between p-4">
          <div className="flex-1"></div>
          <div className="flex-1">
            <a href="/" className="flex items-center">
              <img
                src="/mooney-w.svg"
                className="h-10 drop-shadow-sm drop-shadow-blue-100/50"
                alt="Zak Mooney Logo"
              />
            </a>
          </div>
          <div className="flex-1 flex justify-end">
            <button
              onClick={toggleMobileMenu}
              className="relative w-10 h-10 flex flex-col justify-center items-center z-10"
              aria-label="Toggle mobile menu"
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 my-1 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div className="nav-frame">
          <div className="max-w-[20px] md:max-w-[100px]">
            <div className="w-full md:w-auto max-w-[20px]" />
            <div className="hidden md:inline-block" />
          </div>
          <div />
          <div>
            <div />
            <div />
            <div />
          </div>
          <div />
          <div className="max-w-[20px] md:max-w-[100px]">
            <div className="hidden md:inline-block" />
            <div className="w-full md:w-auto max-w-[20px]" />
          </div>
        </div>
      </motion.nav>

      {/* mobile panel */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-gray-900/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeMobileMenu}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center"
          aria-label="Close mobile menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="flex flex-col h-full pt-20 px-8">
          <div className="flex flex-col gap-6">
            <NavButton href="/" exact>
              About
            </NavButton>
            <NavButton href="/experience">Experience</NavButton>
            <NavButton href="/portfolio">Portfolio</NavButton>
            <NavButton href="/contact">Contact</NavButton>
          </div>

          <div className="mt-auto mb-8 flex justify-center">
            <img
              src="/mooney-w.svg"
              className="h-16 md:h-18 drop-shadow-sm drop-shadow-blue-100/50"
              alt="Zak Mooney Logo"
            />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
