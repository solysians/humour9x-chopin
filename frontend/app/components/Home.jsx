"use client";

import { useState } from "react";
import style from "../cssComponents/Home.module.css";
import { useTheme } from "../Hooks/useTheme";
import AI_Agent from "./AI_Agent";
import Login from "../components/Login";

export default function Home({ display }) {
    const [theme, setTheme] = useTheme();
    const dark = theme?.dark || false;
   
    const [query, setQuery] = useState("");

    return (
        <main className={`${style.main} ${dark ? style.dark : ""}`} style={{ display }}>
            <div className={style["main-section-left"]}>
                <AI_Agent setQuery={setQuery} />
            </div>
            <div className={style["main-section-content"]}>
                <Login />
            </div>


           
            
        </main>
    );
}