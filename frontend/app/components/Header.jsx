"use client";

import { useState } from "react";
import style from "@/app/cssComponents/Header.module.css";
import { useTheme } from "@/app/Hooks/useTheme";
import Image from "next/image";
import Link from "next/link";
import imagelogo from "@/app/assets/image.png"; 
import Login from "./Login";
export default function Header({ display, setDisplay }) {
  const [theme, setTheme] = useTheme();
  const dark = theme?.dark || false;

  function toggleTheme() {
    setTheme((prev) => {
      const newDark = !prev.dark;
      localStorage.setItem("dark", newDark);
      return { ...prev, dark: newDark };
    });
  }

  const linkHoverStyle = {
    transition: "color 0.3s ease",
    cursor: "pointer",
  };

  return (
    <header className={dark ? style.dark : style["header-container"]}>
      <div className={style["header-content"]}>
        {/* Left Section: Logo */}
        <div className={style["header-content-left"]}>
          <div className={style.logo}>
            {imagelogo && imagelogo !== "" ? ( // Check if imagelogo is defined and not an empty string
              <Image src={imagelogo} alt="logo" width={100} height={50} />
            ) : (
              <div style={{ width: 100, height: 50, backgroundColor: "#ccc" }}>
                Logo
              </div>
            )}
          </div>
        </div>

        {/* Center Section: Navigation Links */}
        <div className={style["header-content-center"]}>
          <nav>
            <ul className={style["nav-bar-center"]}>
              <li>
                <Link href="/news">
                  <p style={linkHoverStyle}>News</p>
                </Link>
              </li>
              <li>
                <Link href="/radio">
                  <p style={linkHoverStyle}>Radio</p>
                </Link>
              </li>
              <li>
                <Link href="/sentiment">
                  <p style={linkHoverStyle}>Sentiment</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Section: Theme Toggle and Wallet Connection */}
        <div className={style["header-content-right"]}>
          <nav>
            <ul className={style["nav-bar-right"]} style={{ display: 'flex', alignItems: 'center' }}>
              <li className={style["dark-container"]} onClick={toggleTheme}>
                <p>{dark ? "\u2600 Light" : "\ud83c\udf19 Dark"}</p>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                              <Login />
                
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}