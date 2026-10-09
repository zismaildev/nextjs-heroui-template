"use client";

import React, { createContext, useContext } from "react";

interface ThemeContextType {
    showImage: boolean;
    backgroundImage: string;
    backgroundImageLight: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: ThemeContextType = {
    showImage: false,
    backgroundImage: "",
    backgroundImageLight: "",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeContext.Provider value={defaultTheme}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeConfig() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useThemeConfig must be used within a ThemeProvider");
    }
    return context;
}
