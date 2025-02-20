'use client';

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedDark = localStorage.getItem('dark');
            if (storedDark === null) {
                localStorage.setItem('dark', 'false');
            } else {
                setDark(storedDark === 'true');
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('dark', dark.toString());
        }
    }, [dark]);

    return <ThemeContext.Provider value={[dark, setDark]}>{children}</ThemeContext.Provider>;
}