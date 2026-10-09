import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function useIsDark() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? resolvedTheme === "dark" : true;

    return { mounted, isDark, theme, setTheme, resolvedTheme };
}
