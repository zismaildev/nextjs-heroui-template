"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@heroui/react";
import { Icon } from "@iconify/react";

export const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // ป้องกันปัญหา Hydration mismatch
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <Switch
            isSelected={isDark}
            size="md"
            onChange={(isSelected: boolean) => setTheme(isSelected ? "dark" : "light")}
        >
            <Switch.Control>
                <Switch.Thumb>
                    {isDark ? (
                        <Icon icon="mdi:moon-waning-crescent" className="w-4 h-4" />
                    ) : (
                        <Icon icon="mdi:white-balance-sunny" className="w-4 h-4" />
                    )}
                </Switch.Thumb>
            </Switch.Control>
        </Switch>
    );
};