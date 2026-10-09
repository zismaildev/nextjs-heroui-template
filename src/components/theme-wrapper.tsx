"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useThemeConfig } from "@/context/theme-context";
import { Particles } from "./particles-bg";

interface ThemeWrapperProps {
    children: React.ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    const { showImage, backgroundImage, backgroundImageLight } = useThemeConfig();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen flex flex-col">
                {children}
            </div>
        );
    }

    const isDark = resolvedTheme === "dark";
    const particleColor = isDark ? "#ffffff" : "#000000";

    return (
        <>
            <div className={`relative min-h-screen w-full flex flex-col overflow-x-hidden transition-colors duration-700 ${isDark ? "bg-background" : "bg-slate-100"}`}>


                {/* ─── Animated Background Layer ─── */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

                    {/* Background Image (ถ้ามี) */}
                    {showImage && (
                        <>
                            <div
                                className={`absolute inset-0 z-0 bg-cover bg-center scale-105 transition-all duration-1000 ${isDark ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                style={{ backgroundImage: `url("${backgroundImage}")`, backgroundRepeat: "no-repeat" }}
                            />
                            <div
                                className={`absolute inset-0 z-0 bg-cover bg-center scale-105 transition-all duration-1000 ${!isDark ? "opacity-40 translate-y-0" : "opacity-0"}`}
                                style={{ backgroundImage: `url("${backgroundImageLight}")`, backgroundRepeat: "no-repeat" }}
                            />
                        </>
                    )}

                    {/* Animated Grid Pattern */}
                    <div
                        className={`absolute inset-0 z-[1] grid-pan transition-opacity duration-1000 ${isDark ? "opacity-[0.04]" : "opacity-[0.05]"}`}
                        style={{
                            backgroundImage: isDark
                                ? "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)"
                                : "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />

                    {/* Floating Orbs */}
                    <div className={`orb-1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] z-[2] transition-colors duration-1000 ${isDark ? "bg-violet-600/25" : "bg-violet-400/15"}`} />
                    <div className={`orb-2 absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full blur-[110px] z-[2] transition-colors duration-1000 ${isDark ? "bg-cyan-500/20" : "bg-sky-300/15"}`} />
                    <div className={`orb-3 absolute -bottom-24 -left-24 w-[460px] h-[460px] rounded-full blur-[130px] z-[2] transition-colors duration-1000 ${isDark ? "bg-rose-600/20" : "bg-pink-300/10"}`} />
                    <div className={`orb-4 absolute -bottom-20 -right-20 w-[380px] h-[380px] rounded-full blur-[100px] z-[2] transition-colors duration-1000 ${isDark ? "bg-emerald-500/15" : "bg-emerald-300/10"}`} />

                    {/* Center Glow (light mode only) - Muted for better comfort */}
                    {!isDark && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] blur-[220px] rounded-full z-[1] bg-slate-200/30 animate-pulse" />
                    )}

                </div>

                {/* Magic UI Particles */}
                <Particles
                    className="fixed inset-0 z-[2] pointer-events-none"
                    quantity={100}
                    staticity={50}
                    ease={60}
                    size={0.45}
                    color={particleColor}
                    refresh={!isDark}
                />



                {/* Gradient Overlay */}
                <div
                    className={`fixed inset-0 z-[5] pointer-events-none transition-all duration-1000 ${isDark
                        ? "bg-gradient-to-b from-background/60 via-background/30 to-background/60"
                        : "bg-gradient-to-b from-background/50 via-background/20 to-background/50"
                        }`}
                />

                {/* ─── Main Content ─── */}
                <div className="relative z-20 flex-1 flex flex-col pointer-events-none">
                    {/* The content itself should have pointer-events-auto */}
                    <div className="pointer-events-auto flex-1 flex flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}