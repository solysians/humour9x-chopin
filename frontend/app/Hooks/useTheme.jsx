// 'use client';

// import { useContext } from "react";
// import { context } from "@/app/context/ThemeContext";

// export function useTheme() {
//     return useContext(context);
// }

// Hooks/useTheme.js
'use client';

import { useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext"; // Adjusted to import ThemeContext

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context; // Returns [dark, setDark]
}