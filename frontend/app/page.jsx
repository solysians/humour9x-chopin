"use client";

import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";

export default function Page({ children }) {
    const [display, setDisplay] = useState("block");

    return (
        <>
            <Header display={display} setDisplay={setDisplay} />
            <Home />
            {children}
        </>
    );
}
