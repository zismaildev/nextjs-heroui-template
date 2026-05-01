"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useThemeConfig } from "@/context/theme-context";
import { Particles } from "./particles-bg";
import { BackgroundBeams } from "./background-beams";

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
            <style>{`
                @keyframes orb-float-1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33%  { transform: translate(60px, -80px) scale(1.15); }
                    66%  { transform: translate(-40px, 40px) scale(0.9); }
                }
                @keyframes orb-float-2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33%  { transform: translate(-70px, 60px) scale(1.1); }
                    66%  { transform: translate(50px, -50px) scale(0.95); }
                }
                @keyframes orb-float-3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%  { transform: translate(40px, 70px) scale(1.2); }
                }
                @keyframes orb-float-4 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    40%  { transform: translate(-50px, -60px) scale(1.05); }
                    80%  { transform: translate(30px, 40px) scale(0.92); }
                }
                @keyframes grid-pan {
                    0%   { background-position: 0px 0px; }
                    100% { background-position: 60px 60px; }
                }
                .orb-1 { animation: orb-float-1 14s ease-in-out infinite; }
                .orb-2 { animation: orb-float-2 18s ease-in-out infinite; }
                .orb-3 { animation: orb-float-3 12s ease-in-out infinite; }
                .orb-4 { animation: orb-float-4 20s ease-in-out infinite; }
                .grid-pan { animation: grid-pan 8s linear infinite; }
            `}</style>

            <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden transition-colors duration-700 bg-background">

                {/* ─── Animated Background Layer ─── */}
                <div className="fixed inset-0 z-0 overflow-hidden">

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

                    {/* Center Glow (light mode only) */}
                    {!isDark && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] blur-[180px] rounded-full z-[1] bg-indigo-100/50 animate-pulse" />
                    )}

                    {/* Background Beams with Collision */}
                    <BackgroundBeams
                        className="z-[3]"
                        isDark={isDark}
                        beamCount={10}
                    />

                    {/* Magic UI Particles */}
                    <Particles
                        className="absolute inset-0 z-[4]"
                        quantity={100}
                        staticity={50}
                        ease={60}
                        size={0.45}
                        color={particleColor}
                        refresh={!isDark}
                    />

                    {/* Gradient Overlay */}
                    <div
                        className={`absolute inset-0 z-[5] pointer-events-none transition-all duration-1000 ${isDark
                            ? "bg-gradient-to-b from-background/60 via-background/30 to-background/60"
                            : "bg-gradient-to-b from-background/50 via-background/20 to-background/50"
                        }`}
                    />
                </div>

                {/* ─── Main Content ─── */}
                <div className="relative z-20 flex-1 flex flex-col">
                    {children}
                </div>
            </div>
        </>
    );
}