"use client";

import { useIsDark } from "@/components/use-is-dark";
import { Icon } from "@iconify/react";

export const ThemeSwitch = () => {  
    const { mounted, isDark, setTheme } = useIsDark();

    if (!mounted) return <div className="w-10 h-10 rounded-full bg-slate-200/20" />;

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 overflow-hidden group shadow-sm
                ${isDark
                    ? "bg-white/[0.03] border-white/10 hover:border-white/30 text-indigo-400"
                    : "bg-slate-100 border-slate-200 hover:border-slate-400 text-indigo-600"
                }`}
            aria-label="Toggle theme"
        >
            {/* Background Glow on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                ${isDark ? "bg-indigo-500/10" : "bg-indigo-500/5"}`}
            />

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                {/* Sun icon */}
                <div className={`absolute transition-all duration-700 transform 
                    ${isDark ? "translate-y-12 opacity-0 rotate-180" : "translate-y-0 opacity-100 rotate-0"}`}
                >
                    <Icon icon="mdi:white-balance-sunny" className="text-xl" />
                </div>

                {/* Moon icon */}
                <div className={`absolute transition-all duration-700 transform 
                    ${isDark ? "translate-y-0 opacity-100 rotate-0" : "-translate-y-12 opacity-0 -rotate-180"}`}
                >
                    <Icon icon="mdi:moon-waning-crescent" className="text-xl" />
                </div>
            </div>

            {/* Subtle border shine for dark mode */}
            {isDark && (
                <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
            )}
        </button>
    );
};