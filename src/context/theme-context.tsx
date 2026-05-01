"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

interface ThemeContextType {
    showImage: boolean;
    setShowImage: (show: boolean) => void;
    backgroundImage: string;
    setBackgroundImage: (url: string) => void;
    backgroundImageLight: string;
    setBackgroundImageLight: (url: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // ตั้งค่าเริ่มต้นให้แสดงภาพพื้นหลังคอนเสิร์ต (Login style) ตลอดทั้งเว็บไซต์
    const [showImage, setShowImage] = useState(true);
    const [backgroundImage, setBackgroundImage] = useState("/images/login-bg.png");
    const [backgroundImageLight, setBackgroundImageLight] = useState("/images/login-bg-light.png");

    const value = useMemo(() => ({
        showImage,
        setShowImage,
        backgroundImage,
        setBackgroundImage,
        backgroundImageLight,
        setBackgroundImageLight
    }), [showImage, backgroundImage, backgroundImageLight]);

    return (
        <ThemeContext.Provider value={value}>
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